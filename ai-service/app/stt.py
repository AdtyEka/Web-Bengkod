import os
import logging
from transformers import pipeline

logger = logging.getLogger(__name__)

stt_pipeline = None

def load_stt_model():
    global stt_pipeline
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "stt_model")
    try:
        if os.path.exists(model_path):
            # Use 'automatic-speech-recognition' task
            stt_pipeline = pipeline("automatic-speech-recognition", model=model_path, tokenizer=model_path)
            logger.info("STT Model loaded successfully.")
        else:
            logger.warning(f"STT Model directory not found at {model_path}.")
    except Exception as e:
        logger.error(f"Error loading STT model: {e}")

def transcribe_audio(audio_bytes: bytes) -> str:
    if not stt_pipeline:
        raise Exception("STT pipeline is not loaded or not found.")
    
    try:
        # The transformers pipeline for ASR can accept raw audio bytes (it decodes them internally via ffmpeg)
        result = stt_pipeline(audio_bytes)
        return result.get("text", "")
    except Exception as e:
        logger.error(f"STT inference failed: {e}")
        raise e
