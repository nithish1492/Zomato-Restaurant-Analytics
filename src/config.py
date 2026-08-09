"""
=========================================================
Project Configuration File
=========================================================
"""

from pathlib import Path

# -------------------------------------------------------
# Project Root
# -------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent

# -------------------------------------------------------
# Data Paths
# -------------------------------------------------------

RAW_DATA = PROJECT_ROOT / "data" / "raw"
PROCESSED_DATA = PROJECT_ROOT / "data" / "processed"

# -------------------------------------------------------
# Raw Files
# -------------------------------------------------------

METADATA_FILE = RAW_DATA / "Zomato Restaurant names and Metadata.csv"
REVIEWS_FILE = RAW_DATA / "Zomato Restaurant reviews.csv"

# -------------------------------------------------------
# Processed Files
# -------------------------------------------------------

CLEAN_METADATA = PROCESSED_DATA / "cleaned_metadata.csv"
CLEAN_REVIEWS = PROCESSED_DATA / "cleaned_reviews.csv"

MERGED_DATA = PROCESSED_DATA / "merged_dataset.csv"

SENTIMENT_DATA = PROCESSED_DATA / "sentiment_dataset.csv"

FEATURE_DATA = PROCESSED_DATA / "restaurant_features.csv"

CLUSTER_DATA = PROCESSED_DATA / "clustered_restaurants.csv"

PCA_DATA = PROCESSED_DATA / "pca_dataset.csv"

# -------------------------------------------------------
# Models
# -------------------------------------------------------

MODELS = PROJECT_ROOT / "models"

KMEANS_MODEL = MODELS / "kmeans_model.pkl"

SCALER_MODEL = MODELS / "scaler.pkl"

CUISINE_ENCODER_MODEL = MODELS / "cuisine_encoder.pkl"

COLLECTION_ENCODER_MODEL = MODELS / "collection_encoder.pkl"

# -------------------------------------------------------
# Reports
# -------------------------------------------------------

REPORTS = PROJECT_ROOT / "reports"

FIGURES = REPORTS / "figures"

OUTPUTS = REPORTS / "outputs"

# -------------------------------------------------------
# Random State
# -------------------------------------------------------

RANDOM_STATE = 42

# -------------------------------------------------------
# Create Folders Automatically
# -------------------------------------------------------

RAW_DATA.mkdir(parents=True, exist_ok=True)
PROCESSED_DATA.mkdir(parents=True, exist_ok=True)
MODELS.mkdir(parents=True, exist_ok=True)
REPORTS.mkdir(parents=True, exist_ok=True)
FIGURES.mkdir(parents=True, exist_ok=True)
OUTPUTS.mkdir(parents=True, exist_ok=True)