"""
=========================================================
Project : Zomato Restaurant Analysis and Clustering
Module  : Prediction Module
=========================================================
"""

import joblib
import pandas as pd

from src.config import (
    KMEANS_MODEL,
    SCALER_MODEL
)


class RestaurantPredictor:

    def __init__(self):

        print("\nLoading Trained Model...")

        self.model = joblib.load(KMEANS_MODEL)

        self.scaler = joblib.load(SCALER_MODEL)

        print("Model Loaded Successfully.")

    # --------------------------------------------------
    # Predict Cluster
    # --------------------------------------------------

    def predict(self):

        print("\nEnter Restaurant Details\n")

        average_rating = float(input("Average Rating : "))
        average_cost = float(input("Average Cost : "))
        review_count = int(input("Review Count : "))
        average_pictures = float(input("Average Pictures : "))
        positive_percent = float(input("Positive Review % : "))
        negative_percent = float(input("Negative Review % : "))
        neutral_percent = float(input("Neutral Review % : "))
        cuisine_encoded = int(input("Cuisine Encoded : "))
        collection_encoded = int(input("Collection Encoded : "))

        sample = pd.DataFrame(
            [[
                average_rating,
                average_cost,
                review_count,
                average_pictures,
                positive_percent,
                negative_percent,
                neutral_percent,
                cuisine_encoded,
                collection_encoded
            ]],
            columns=[

                "average_rating",
                "average_cost",
                "review_count",
                "average_pictures",
                "positive_percent",
                "negative_percent",
                "neutral_percent",
                "cuisine_encoded",
                "collection_encoded"

            ]
        )

        # Preserve feature names after scaling
        scaled = self.scaler.transform(sample)

        scaled = pd.DataFrame(
            scaled,
            columns=[

                "average_rating",
                "average_cost",
                "review_count",
                "average_pictures",
                "positive_percent",
                "negative_percent",
                "neutral_percent",
                "cuisine_encoded",
                "collection_encoded"

            ]
        )

        cluster = self.model.predict(scaled)[0]

        print("\n====================================")

        print("Predicted Cluster :", cluster)

        names = {

            0: "Mid-range Restaurants",

            1: "Budget Restaurants",

            2: "Premium Highly Rated Restaurants",

            3: "Popular Family Dining"

        }

        print(
            "Business Segment :",
            names.get(cluster, "Unknown")
        )

        print("====================================")