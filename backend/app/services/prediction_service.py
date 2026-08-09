import joblib
import numpy as np
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL = joblib.load(BASE_DIR / "models" / "kmeans_model.pkl")

SCALER = joblib.load(BASE_DIR / "models" / "scaler.pkl")

CUISINE_ENCODER = joblib.load(
    BASE_DIR / "models" / "cuisine_encoder.pkl"
)

COLLECTION_ENCODER = joblib.load(
    BASE_DIR / "models" / "collection_encoder.pkl"
)

SEGMENTS = {
    0: "Standard Restaurants",
    1: "Budget Restaurants",
    2: "Premium Highly Rated Restaurants",
    3: "Luxury Restaurants",
}


def predict(data):

    features = np.array([
        [
            data.average_rating,
            data.average_cost,
            data.review_count,
            data.average_pictures,
            data.positive_percent,
            data.negative_percent,
            data.neutral_percent,
            data.cuisine_encoded,
            data.collection_encoded,
        ]
    ])

    scaled = SCALER.transform(features)

    cluster = int(MODEL.predict(scaled)[0])

    return {
        "cluster": cluster,
        "segment": SEGMENTS.get(cluster, "Unknown"),
    }