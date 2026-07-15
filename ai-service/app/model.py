import pickle
import os
import re
from typing import List, Dict, Tuple
from sklearn.metrics.pairwise import cosine_similarity

import joblib
import xgboost as xgb

# Paths
MODELS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models")
VECTORIZER_PATH = os.path.join(MODELS_DIR, "vectorizer.pkl")
MODEL_PATH = os.path.join(MODELS_DIR, "model_best.pkl")
LABEL_ENCODER_PATH = os.path.join(MODELS_DIR, "label_encoder.pkl")
SKILLS_PATH = os.path.join(MODELS_DIR, "filtered_skills.pkl")

# Global variables to cache models
_vectorizer = None
_model = None
_label_encoder = None
_filtered_skills = None

def load_models():
    global _vectorizer, _model, _label_encoder, _filtered_skills
    if _vectorizer is not None and _model is not None and _label_encoder is not None:
        return

    # Load TfidfVectorizer
    _vectorizer = joblib.load(VECTORIZER_PATH)

    # Load RandomForestClassifier / XGBoost
    try:
        _model = joblib.load(MODEL_PATH)
    except Exception as e:
        print(f"Warning: Failed to load model_best.pkl: {e}")
        _model = None

    # Load LabelEncoder
    _label_encoder = joblib.load(LABEL_ENCODER_PATH)

    # Load filtered_skills list
    with open(SKILLS_PATH, "rb") as f:
        _filtered_skills = pickle.load(f)

def clean_text(text: str) -> str:
    """Preprocess text similarly to how the model was trained."""
    if not text:
        return ""
    text = text.lower()
    # Remove special characters and keep alphanumeric + common spacing/punctuation
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def predict_cv(cv_text: str, job_description: str, target_position: str = None) -> Tuple[float, str, List[str], List[str]]:
    """
    Predict the job category and calculate ML matching confidence.
    
    Returns:
        tuple containing:
        - ml_confidence (float): Calculated similarity and fit percentage (0-100)
        - predicted_category (str): Category predicted from the model
        - matched_skills (list of str): Skills present in both CV and JD
        - missing_skills (list of str): Skills in JD but missing in CV
    """
    load_models()

    clean_cv = clean_text(cv_text)
    clean_jd = clean_text(job_description)

    # 1. Predict Category using model_best.pkl
    cv_vector = _vectorizer.transform([clean_cv])
    ml_confidence = 0.0
    try:
        probabilities = _model.predict_proba(cv_vector)[0]
        pred_idx = probabilities.argmax()
        predicted_category = _label_encoder.inverse_transform([pred_idx])[0]
        
        # Get the XGBoost probability for the TARGET position if provided
        if target_position and target_position in _label_encoder.classes_:
            target_idx = list(_label_encoder.classes_).index(target_position)
            # Bounds check: model might have fewer classes than the label encoder
            if target_idx < len(probabilities):
                ml_confidence = float(probabilities[target_idx] * 100)
            else:
                # Target position exists in encoder but not trained in model; use max prob
                ml_confidence = float(probabilities[pred_idx] * 100)
        else:
            # Fallback to max probability if target is unknown
            ml_confidence = float(probabilities[pred_idx] * 100)
            
    except Exception as e:
        print(f"Warning: Model prediction failed (likely feature shape mismatch): {e}")
        predicted_category = "Unknown Category"

    # 2. Extract matching/missing skills using filtered_skills.pkl
    matched_skills = []
    missing_skills = []
    
    # Simple regex search for boundaries to avoid matching sub-words (e.g., 'java' in 'javascript')
    
    # Common stop words that accidentally got into the training data
    stop_words = {
        'in', 'of', 'for', 'to', 'as', 'and', 'or', 'the', 'a', 'an', 'is', 'are', 
        'with', 'by', 'on', 'at', 'it', 'from', 'about', 'this',
        'business', 'core', 'design', 'development', 'platform', 'application', 
        'system', 'software', 'technology', 'fintech', 'digibank', 'insurance', 
        'lending', 'funds core', 'save and spend', 'payment acquiring'
    }
                  
    for skill in _filtered_skills:
        skill_clean = skill.lower().strip()
        
        # 1. Skip empty or stop words
        if not skill_clean or skill_clean in stop_words:
            continue
            
        # 2. Skip long sentences (more than 5 words is rarely a technical skill)
        if len(skill_clean.split()) > 5:
            continue
            
        # 3. Skip skills containing conversational parentheses e.g. "(specifically on user journeys)"
        if '(' in skill_clean or ')' in skill_clean:
            continue
            
        # Check if skill exists in job description
        pattern = r'\b' + re.escape(skill_clean) + r'\b'
        in_jd = re.search(pattern, clean_jd) is not None
        
        if in_jd:
            # Check if skill exists in CV
            in_cv = re.search(pattern, clean_cv) is not None
            if in_cv:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

    # 3. Calculate Cosine Similarity between CV and Job Description
    jd_vector = _vectorizer.transform([clean_jd])
    cos_sim = float(cosine_similarity(cv_vector, jd_vector)[0][0])
    
    # Normalize cosine similarity: it's usually small (0.05–0.4), scale it up to 0-1 range
    scaled_cos_sim = min(cos_sim * 2.5, 1.0)

    # 4. Calculate Skill Match Ratio from job description
    total_req_skills = len(matched_skills) + len(missing_skills)
    skill_match_ratio = len(matched_skills) / total_req_skills if total_req_skills > 0 else 0.0

    # 5. Normalize XGBoost probability to 0-1 range
    xgb_prob = ml_confidence / 100.0

    # 6. Hybrid Formula:
    #    40% XGBoost  → "Does this CV 'feel' like a person for this Target Position?"
    #    40% Skill Match → "Does the CV have the required skills from the Job Desc?"
    #    20% Cosine Sim  → "How similar is the CV's language/context to the Job Desc?"
    hybrid_score = (xgb_prob * 0.40) + (skill_match_ratio * 0.40) + (scaled_cos_sim * 0.20)
    ml_confidence = round(max(0.0, min(100.0, hybrid_score * 100)), 2)

    return ml_confidence, predicted_category, matched_skills, missing_skills
