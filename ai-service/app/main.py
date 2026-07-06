import logging
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io

from app.schemas import PredictRequest, PredictResponse, AnalyzeResponse
from app.model import predict_cv, load_models
from app.gemini import analyze_cv_with_gemini

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

@app.get("/")
def read_root():
    return {"status": "healthy", "service": "AI Integrator for CV Job Matcher"}

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
            cv_text, job_description
        )

        # 4. Call Gemini semantic evaluation
        gemini_result = analyze_cv_with_gemini(cv_text, target_position, job_description)
        gemini_score = gemini_result.get("gemini_score", 0)

        # 5. Apply Fusion Logic: Final Score = 30% ML Confidence + 70% Gemini Score
        final_score = int(round(0.3 * ml_confidence + 0.7 * gemini_score))
        
        # Combine skills found from both ML keyword overlap and Gemini semantic parsing
        # Combine lists and preserve uniqueness
        all_skills_found = sorted(list(set(ml_matched + gemini_result.get("skills_found", []))))
        all_skills_missing = sorted(list(set(gemini_result.get("skills_missing", []))))
        
        # Ensure that anything found is not marked as missing
        all_skills_missing = [s for s in all_skills_missing if s not in all_skills_found]

        return AnalyzeResponse(
            match_score=final_score,
            skills_found=all_skills_found,
            skills_missing=all_skills_missing,
            breakdown=gemini_result.get("breakdown", {"technical": 0, "experience": 0, "industry": 0}),
            recommendations=gemini_result.get("recommendations", []),
            ml_confidence=ml_confidence,
            gemini_score=gemini_score
        )

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error in /analyze-cv endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")
