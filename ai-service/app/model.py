import pickle
import os
import re
from typing import List, Dict, Tuple
from sklearn.metrics.pairwise import cosine_similarity

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
    if _vectorizer is not None:
        return

    # Load TfidfVectorizer
    with open(VECTORIZER_PATH, "rb") as f:
        _vectorizer = pickle.load(f)

    # Load RandomForestClassifier
    with open(MODEL_PATH, "rb") as f:
        _model = pickle.load(f)

    # Load LabelEncoder
    with open(LABEL_ENCODER_PATH, "rb") as f:
        _label_encoder = pickle.load(f)

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

def predict_cv(cv_text: str, job_description: str) -> Tuple[float, str, List[str], List[str]]:
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
    try:
        pred_idx = _model.predict(cv_vector)[0]
        predicted_category = _label_encoder.inverse_transform([pred_idx])[0]
    except Exception as e:
        print(f"Warning: Model prediction failed (likely feature shape mismatch): {e}")
        predicted_category = "Unknown Category"

    # 2. Extract matching/missing skills using filtered_skills.pkl
    matched_skills = []
    missing_skills = []
    
    # Simple regex search for boundaries to avoid matching sub-words (e.g., 'java' in 'javascript')
    for skill in _filtered_skills:
        skill_clean = skill.lower().strip()
        if not skill_clean:
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

    # 3. Calculate Cosine Similarity
    jd_vector = _vectorizer.transform([clean_jd])
    cos_sim = cosine_similarity(cv_vector, jd_vector)[0][0]

    # 4. Calculate ML Confidence score (0-100)
    # Combining Cosine Similarity and skill matching ratio
    total_req_skills = len(matched_skills) + len(missing_skills)
    skill_match_ratio = len(matched_skills) / total_req_skills if total_req_skills > 0 else 1.0

    # Normalizing cosine similarity (which is usually lower, e.g. 0.1 to 0.5) to stretch the range
    scaled_cos_sim = min(cos_sim * 2.0, 1.0)

    # Combined ML Confidence Score
    ml_confidence = (scaled_cos_sim * 0.4 + skill_match_ratio * 0.6) * 100
    ml_confidence = round(max(0.0, min(100.0, ml_confidence)), 2)

    return ml_confidence, predicted_category, matched_skills, missing_skills
