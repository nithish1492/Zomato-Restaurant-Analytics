"""
=========================================================
Data Preprocessing
=========================================================
"""

import joblib
import pandas as pd

from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler

from src.config import (
    PROCESSED_DATA,
    SCALER_MODEL,
    CUISINE_ENCODER_MODEL,
    COLLECTION_ENCODER_MODEL
)


class DataPreprocessor:

    def __init__(self, dataframe):

        self.df = dataframe.copy()

        self.scaler = StandardScaler()

        self.cuisine_encoder = LabelEncoder()

        self.collection_encoder = LabelEncoder()

    # ---------------------------------------------------

    def handle_missing_values(self):

        self.df["collections"] = self.df["collections"].fillna("Unknown")

        self.df["cuisines"] = self.df["cuisines"].fillna("Unknown")

    # ---------------------------------------------------

    def encode_features(self):

        self.df["cuisine_encoded"] = self.cuisine_encoder.fit_transform(
            self.df["cuisines"]
        )

        self.df["collection_encoded"] = self.collection_encoder.fit_transform(
            self.df["collections"]
        )

    # ---------------------------------------------------

    def select_features(self):

        self.features = self.df[
            [
                "average_rating",
                "average_cost",
                "review_count",
                "average_pictures",
                "positive_percent",
                "negative_percent",
                "neutral_percent",
                "cuisine_encoded",
                "collection_encoded",
            ]
        ]

        print("\nSelected Features\n")

        print(self.features.head())

    # ---------------------------------------------------

    def scale_features(self):

        scaled = self.scaler.fit_transform(self.features)

        self.scaled_df = pd.DataFrame(
            scaled,
            columns=self.features.columns
        )

        print("\nFeature Scaling Completed.")

    # ---------------------------------------------------

    def save(self):

        self.scaled_df.to_csv(
            PROCESSED_DATA / "scaled_features.csv",
            index=False
        )

        joblib.dump(
            self.scaler,
            SCALER_MODEL
        )

        joblib.dump(
            self.cuisine_encoder,
            CUISINE_ENCODER_MODEL
        )

        joblib.dump(
            self.collection_encoder,
            COLLECTION_ENCODER_MODEL
        )

        print("\nScaled Dataset Saved Successfully.")

        print("Scaler Saved.")

        print("Cuisine Encoder Saved.")

        print("Collection Encoder Saved.")

    # ---------------------------------------------------

    def process(self):

        self.handle_missing_values()

        self.encode_features()

        self.select_features()

        self.scale_features()

        self.save()

        return self.scaled_df