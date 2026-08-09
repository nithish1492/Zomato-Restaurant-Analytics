"""
=========================================================
Project : Zomato Restaurant Analytics and Clustering
Module  : Data Merging
=========================================================
"""

import pandas as pd

from src.config import (
    MERGED_DATA
)


class DataMerger:

    def __init__(self, metadata_df, reviews_df):

        self.metadata = metadata_df
        self.reviews = reviews_df

    # ----------------------------------------------------
    # Compare Restaurant Names
    # ----------------------------------------------------

    def compare_restaurants(self):

        metadata_names = set(self.metadata["name"])

        review_names = set(self.reviews["restaurant"])

        only_metadata = metadata_names - review_names

        only_reviews = review_names - metadata_names

        print("\n" + "=" * 60)
        print("Restaurant Name Comparison")
        print("=" * 60)

        print(f"Restaurants in Metadata : {len(metadata_names)}")
        print(f"Restaurants in Reviews  : {len(review_names)}")

        print(f"\nOnly in Metadata : {len(only_metadata)}")

        if only_metadata:
            for name in sorted(only_metadata):
                print(" -", name)

        print(f"\nOnly in Reviews : {len(only_reviews)}")

        if only_reviews:
            for name in sorted(only_reviews):
                print(" -", name)

    # ----------------------------------------------------
    # Merge Datasets
    # ----------------------------------------------------

    def merge(self):

        merged_df = pd.merge(
            self.reviews,
            self.metadata,
            left_on="restaurant",
            right_on="name",
            how="inner"
        )

        print("\n" + "=" * 60)
        print("Merged Dataset")
        print("=" * 60)

        print(f"Rows    : {merged_df.shape[0]}")
        print(f"Columns : {merged_df.shape[1]}")

        merged_df.to_csv(
            MERGED_DATA,
            index=False
        )

        print("\nMerged dataset saved successfully.")

        return merged_df