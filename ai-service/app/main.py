import logging
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io

from app.schemas import PredictRequest, PredictResponse, AnalyzeResponse
from app.model import predict_cv, load_models
from app.gemini import analyze_cv_with_gemini
from app.stt import load_stt_model, transcribe_audio

# Logger setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI(
    title="AI Integrator for CV Job Matcher",
    description="Microservice combining machine learning classifier and Gemini LLM for resume matching.",
    version="1.0.0"
)

# Enable CORS for local cross-origin communications
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    logger.info("Starting up AI Integrator Service...")
    try:
        load_models()
        logger.info("Machine learning models loaded successfully.")
    except Exception as e:
        logger.error(f"Failed to load ML models at startup: {str(e)}")
        
    try:
        load_stt_model()
    except Exception as e:
        logger.error(f"Failed to load STT model at startup: {str(e)}")

@app.get("/")
def read_root():
    return {"status": "healthy", "service": "AI Integrator for CV Job Matcher"}

@app.get("/categories")
def get_categories():
    """
    Get the available target position categories from the label encoder.
    """
    import app.model
    app.model.load_models()
    if app.model._label_encoder is not None:
        return {"categories": app.model._label_encoder.classes_.tolist()}
    return {"categories": []}

@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest):
    """
    Predict CV category and get matching details using the custom ML model.
    """
    try:
        ml_confidence, predicted_category, matched, missing = predict_cv(
            request.cv_text, request.job_description
        )
        return PredictResponse(
            ml_confidence=ml_confidence,
            predicted_category=predicted_category,
            matched_skills=matched,
            missing_skills=missing
        )
    except Exception as e:
        logger.error(f"Error in /predict endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    """
    Transcribe uploaded audio file using the local Hugging Face ASR model.
    """
    try:
        audio_bytes = await file.read()
        transcription = transcribe_audio(audio_bytes)
        return {"text": transcription}
    except Exception as e:
        logger.error(f"Error in /transcribe endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"STT error: {str(e)}")

@app.post("/analyze-cv", response_model=AnalyzeResponse)
async def analyze_cv(
    file: UploadFile = File(...),
    target_position: str = Form(...),
    job_description: str = Form(...)
):
    """
    Analyze an uploaded resume PDF against a target position and job description.
    Integrates ML confidence with Gemini analysis using 30% / 70% fusion logic.
    """
    # 1. Validate file format
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF resumes are supported.")

    try:
        # Read file contents
        contents = await file.read()
        pdf_file = io.BytesIO(contents)
        
        # 2. Extract text using pypdf
        reader = PdfReader(pdf_file)
        cv_text = ""
        for page in reader.pages:
            text = page.extract_text()
            if text:
                cv_text += text + "\n"
        
        if not cv_text.strip():
            raise HTTPException(status_code=400, detail="Unable to extract text from the PDF. Ensure it is not empty or scanned.")

        # 3. Call ML Predict internally
        ml_confidence, predicted_category, ml_matched, ml_missing = predict_cv(
            cv_text, job_description, target_position
        )

        # 4. Gemini semantic evaluation is disabled (API quota issues)
        # The CV Match Score is fully handled by the ML hybrid formula below.
        gemini_result = analyze_cv_with_gemini(cv_text, target_position, job_description)
        gemini_score = gemini_result.get("gemini_score", 0) if gemini_result else 0

        # 5. Apply Fusion Logic: Final Score = 100% ML Confidence as requested
        final_score = int(round(ml_confidence))
        
        # Combine skills found from both ML keyword overlap and Gemini semantic parsing
        gemini_skills_found = gemini_result.get("skills_found", []) if gemini_result else []
        gemini_skills_missing = gemini_result.get("skills_missing", []) if gemini_result else []
        gemini_breakdown = gemini_result.get("breakdown", {"technical": 0, "experience": 0, "industry": 0}) if gemini_result else {"technical": 0, "experience": 0, "industry": 0}
        gemini_recommendations = gemini_result.get("recommendations", []) if gemini_result else []
        
        raw_skills_found = ml_matched + gemini_skills_found
        raw_skills_missing = ml_missing + gemini_skills_missing
        
        # Clean skills to remove LLM hallucinations (long sentences or jargon)
        stop_words = {
            'in', 'of', 'for', 'to', 'as', 'and', 'or', 'the', 'a', 'an', 'is', 'are', 
            'with', 'by', 'on', 'at', 'it', 'from', 'about', 'this',
            'business', 'core', 'design', 'development', 'platform', 'application', 
            'system', 'software', 'technology', 'fintech', 'digibank', 'insurance', 
            'lending', 'funds core', 'save and spend', 'payment acquiring'
        }
        
        def clean_skills(skills_list):
            cleaned = []
            for s in skills_list:
                s_lower = s.lower().strip()
                if not s_lower or s_lower in stop_words:
                    continue
                if len(s_lower.split()) > 5:
                    continue
                if '(' in s_lower or ')' in s_lower:
                    continue
                cleaned.append(s.strip()) # keep original casing
            return sorted(list(set(cleaned)))

        all_skills_found = clean_skills(raw_skills_found)
        all_skills_missing = clean_skills(raw_skills_missing)
        
        # Ensure that anything found is not marked as missing (case-insensitive check)
        found_lower = {s.lower() for s in all_skills_found}
        all_skills_missing = [s for s in all_skills_missing if s.lower() not in found_lower]

        return AnalyzeResponse(
            match_score=final_score,
            skills_found=all_skills_found,
            skills_missing=all_skills_missing,
            breakdown=gemini_breakdown,
            recommendations=gemini_recommendations,
            ml_confidence=ml_confidence,
            gemini_score=gemini_score
        )

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error in /analyze-cv endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")
