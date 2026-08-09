from fastapi import APIRouter

from app.schemas.request import PredictionRequest
from app.schemas.response import PredictionResponse
from app.services.prediction_service import predict

router = APIRouter()


@router.get("/health")
def health():
    return {
        "status": "success",
        "message": "Zomato Restaurant Analytics Backend is running"
    }


@router.post("/predict", response_model=PredictionResponse)
def predict_cluster(data: PredictionRequest):
    result = predict(data)

    return PredictionResponse(
        cluster=result["cluster"],
        segment=result["segment"]
    )


@router.get("/analytics")
def get_analytics():
    return {
        "total_restaurants": 12450,
        "average_rating": 4.02,
        "average_cost": 840,
        "positive_sentiment": 64.7,

        "clusters": [
            {"name": "Standard Restaurants", "count": 4200},
            {"name": "Premium Highly Rated", "count": 2600},
            {"name": "Budget Friendly", "count": 3100},
            {"name": "Luxury Dining", "count": 950},
            {"name": "Quick Bites", "count": 1200},
            {"name": "Cafe & Bakery", "count": 400}
        ],

        "ratings": [
            {"cluster": "Standard", "avgRating": 4.0},
            {"cluster": "Premium", "avgRating": 4.6},
            {"cluster": "Budget", "avgRating": 3.7},
            {"cluster": "Luxury", "avgRating": 4.8},
            {"cluster": "Quick", "avgRating": 3.5},
            {"cluster": "Cafe", "avgRating": 4.2}
        ],

        "costs": [
            {"cluster": "Standard", "avgCost": 800},
            {"cluster": "Premium", "avgCost": 1800},
            {"cluster": "Budget", "avgCost": 350},
            {"cluster": "Luxury", "avgCost": 3200},
            {"cluster": "Quick", "avgCost": 450},
            {"cluster": "Cafe", "avgCost": 650}
        ],

        "sentiments": [
            {
                "name": "Premium",
                "positive": 78,
                "neutral": 15,
                "negative": 7
            },
            {
                "name": "Casual",
                "positive": 64,
                "neutral": 21,
                "negative": 15
            },
            {
                "name": "Quick Service",
                "positive": 52,
                "neutral": 24,
                "negative": 24
            },
            {
                "name": "Cafés",
                "positive": 70,
                "neutral": 19,
                "negative": 11
            },
            {
                "name": "Budget",
                "positive": 43,
                "neutral": 25,
                "negative": 32
            },
            {
                "name": "Cloud Kitchen",
                "positive": 58,
                "neutral": 22,
                "negative": 20
            }
        ]
    }