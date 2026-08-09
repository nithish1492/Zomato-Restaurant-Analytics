"""
=========================================================
Project : Zomato Restaurant Analytics and Clustering
Module  : Feature Engineering
=========================================================
"""

import pandas as pd

from src.config import FEATURE_DATA


class FeatureEngineering:

    def __init__(self, dataframe):

        self.df = dataframe.copy()

    # -----------------------------------------------------
    # Prepare Dataset
    # -----------------------------------------------------

    def prepare(self):

        # Convert rating to numeric
        self.df["rating"] = pd.to_numeric(
            self.df["rating"],
            errors="coerce"
        )

        # Convert cost to numeric
        self.df["cost"] = (
            self.df["cost"]
            .astype(str)
            .str.replace(",", "", regex=False)
        )

        self.df["cost"] = pd.to_numeric(
            self.df["cost"],
            errors="coerce"
        )

        print("\nDataset Preparation Completed.")

        return self.df

    # -----------------------------------------------------
    # Aggregate Restaurant Features
    # -----------------------------------------------------

    def aggregate(self):

        sentiment = pd.crosstab(
            self.df["restaurant"],
            self.df["sentiment"],
            normalize="index"
        ) * 100

        sentiment.columns = [
            f"{col.lower()}_percent"
            for col in sentiment.columns
        ]

        features = self.df.groupby("restaurant").agg({

            "rating": "mean",

            "cost": "mean",

            "review": "count",

            "pictures": "mean",

            "cuisines": "first",

            "collections": "first"

        })

        features.rename(
            columns={
                "review": "review_count",
                "rating": "average_rating",
                "cost": "average_cost",
                "pictures": "average_pictures"
            },
            inplace=True
        )

        features = features.join(sentiment)

        features.reset_index(inplace=True)

        self.features = features

        print("\nRestaurant Features Created Successfully.")

        print(self.features.head())

        return self.features

    # -----------------------------------------------------
    # Save Dataset
    # -----------------------------------------------------

    def save(self):

        self.features.to_csv(
            FEATURE_DATA,
            index=False
        )

        print(
            "\nRestaurant Feature Dataset Saved Successfully."
        )