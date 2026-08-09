from pydantic import BaseModel


class PredictionRequest(BaseModel):
    average_rating: float
    average_cost: float
    review_count: int
    average_pictures: float
    positive_percent: float
    negative_percent: float
    neutral_percent: float
    cuisine_encoded: int
    collection_encoded: int