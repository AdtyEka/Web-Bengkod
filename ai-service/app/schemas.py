from pydantic import BaseModel
from typing import List, Dict, Optional

class PredictRequest(BaseModel):
    cv_text: str
    job_description: str

class PredictResponse(BaseModel):
    ml_confidence: float
    predicted_category: str
    matched_skills: List[str]
    missing_skills: List[str]

class AnalyzeResponse(BaseModel):
    match_score: int
    skills_found: List[str]
    skills_missing: List[str]
    breakdown: Dict[str, int]  # keys: technical, experience, industry
    recommendations: List[str]
    ml_confidence: float
    gemini_score: int
