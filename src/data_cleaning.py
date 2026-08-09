"""
=========================================================
Project : Zomato Restaurant Analytics and Clustering
Module  : Data Cleaning
=========================================================
"""

from pathlib import Path

import pandas as pd

from src.config import (
    CLEAN_METADATA,
    CLEAN_REVIEWS
)


class DataCleaner:

    def __init__(self, metadata_df, reviews_df):

        self.metadata = metadata_df.copy()

        self.reviews = reviews_df.copy()

    # ---------------------------------------------------
    # Clean Column Names
    # ---------------------------------------------------

    @staticmethod
    def clean_column_names(df):

        df.columns = (
            df.columns
            .str.strip()
            .str.lower()
            .str.replace(" ", "_")
        )

        return df

    # ---------------------------------------------------
    # Standardize Restaurant Names
    # ---------------------------------------------------

    @staticmethod
    def standardize_restaurant_names(df, column_name):

        df[column_name] = (
            df[column_name]
            .astype(str)
            .str.strip()
            .str.lower()
        )

        return df

    # ---------------------------------------------------
    # Remove Duplicate Rows
    # ---------------------------------------------------

    @staticmethod
    def remove_duplicates(df):

        before = len(df)

        df = df.drop_duplicates()

        after = len(df)

        print(f"Removed {before - after} duplicate rows")

        return df

    # ---------------------------------------------------
    # Missing Value Report
    # ---------------------------------------------------

    @staticmethod
    def missing_value_report(df):

        print("\nMissing Values")

        print(df.isnull().sum())

    # ---------------------------------------------------
    # Clean Metadata
    # ---------------------------------------------------

    def clean_metadata(self):

        print("\nCleaning Restaurant Metadata...")

        self.metadata = self.clean_column_names(self.metadata)

        self.metadata = self.remove_duplicates(self.metadata)

        self.metadata = self.standardize_restaurant_names(
            self.metadata,
            "name"
        )

        self.missing_value_report(self.metadata)

        return self.metadata

    # ---------------------------------------------------
    # Clean Reviews
    # ---------------------------------------------------

    def clean_reviews(self):

        print("\nCleaning Reviews Dataset...")

        self.reviews = self.clean_column_names(self.reviews)

        self.reviews = self.remove_duplicates(self.reviews)

        self.reviews = self.standardize_restaurant_names(
            self.reviews,
            "restaurant"
        )

        self.missing_value_report(self.reviews)

        return self.reviews

    # ---------------------------------------------------
    # Save Cleaned Data
    # ---------------------------------------------------

    def save(self):

        # Create processed folder if it doesn't exist
        Path(CLEAN_METADATA).parent.mkdir(
            parents=True,
            exist_ok=True
        )

        self.metadata.to_csv(
            CLEAN_METADATA,
            index=False
        )

        self.reviews.to_csv(
            CLEAN_REVIEWS,
            index=False
        )

        print("\nCleaned datasets saved successfully.")