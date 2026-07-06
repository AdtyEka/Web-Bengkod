import os
import json
import logging
import google.generativeai as genai
from dotenv import load_dotenv

# Load env variables
load_dotenv()

# Logger setup
logger = logging.getLogger(__name__)

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    logger.warning("GEMINI_API_KEY environment variable is not set. Gemini integration will fail.")

def analyze_cv_with_gemini(cv_text: str, target_position: str, job_description: str) -> dict:
    """
    Call Gemini API to analyze the CV text against the target position and job description.
    
    Returns:
        dict: A dictionary containing gemini_score, skills_found, skills_missing, breakdown, and recommendations.
    """
    if not api_key:
        logger.error("GEMINI_API_KEY is not set.")
        return get_fallback_analysis("GEMINI_API_KEY is missing from environment. Please add it to your .env file.")

    prompt = f"""
Analyze the candidate's CV text against the Target Position and Job Description provided below.

Target Position: {target_position}
Job Description:
{job_description}

Candidate CV Text:
{cv_text}

Provide an evaluation in JSON format. You MUST return ONLY a raw JSON string. Do not wrap the JSON in markdown formatting (no ```json codeblocks). Ensure the keys are exact:
1. "gemini_score": An integer score from 0 to 100 representing how well the candidate's skills and experience match the job.
2. "skills_found": A list of strings of skills mentioned in the job description that are PRESENT in the CV.
3. "skills_missing": A list of strings of skills mentioned in the job description that are MISSING in the CV.
4. "breakdown": A dictionary with keys "technical", "experience", and "industry", each containing an integer score from 0 to 100 representing the fit in that area.
5. "recommendations": A list of strings of actionable recommendations to improve the CV for this specific position.

JSON structure example:
{{
  "gemini_score": 85,
  "skills_found": ["React", "TypeScript", "Tailwind CSS"],
  "skills_missing": ["GraphQL", "Docker"],
  "breakdown": {{
    "technical": 90,
    "experience": 80,
    "industry": 85
  }},
  "recommendations": [
    "Highlight your experience with Tailwind CSS in the main profile.",
    "Add certification or details about containerization (Docker) if applicable."
  ]
}}
"""

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        
        raw_text = response.text.strip()
        
        # Parse output
        analysis = json.loads(raw_text)
        
        # Verify required keys
        required_keys = ["gemini_score", "skills_found", "skills_missing", "breakdown", "recommendations"]
        for key in required_keys:
            if key not in analysis:
                raise KeyError(f"Missing required key '{key}' in Gemini response.")
                
        # Ensure breakdown keys are present
        breakdown_keys = ["technical", "experience", "industry"]
        if "breakdown" in analysis:
            for bk in breakdown_keys:
                if bk not in analysis["breakdown"]:
                    analysis["breakdown"][bk] = 50  # Default fallback
        else:
            analysis["breakdown"] = {"technical": 50, "experience": 50, "industry": 50}
            
        return analysis
        
    except Exception as e:
        logger.error(f"Error calling or parsing Gemini: {str(e)}")
        # Provide fallback dynamic analysis in case of API issues
        return get_fallback_analysis(f"Error communicating with AI model: {str(e)}")

def get_fallback_analysis(error_msg: str) -> dict:
    """Generate generic fallback analysis if Gemini fails or is not configured."""
    return {
        "gemini_score": 0,
        "skills_found": [],
        "skills_missing": [],
        "breakdown": {
            "technical": 0,
            "experience": 0,
            "industry": 0
        },
        "recommendations": [
            f"Unable to run Gemini analysis: {error_msg}",
            "Please check that your GEMINI_API_KEY environment variable is valid and you have active internet connection."
        ]
    }
