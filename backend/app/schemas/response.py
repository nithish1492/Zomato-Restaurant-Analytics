from pydantic import BaseModel


class PredictionResponse(BaseModel):
    cluster: int
    segment: str