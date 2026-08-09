"""
=========================================================
Load Zomato Datasets
=========================================================
"""

import pandas as pd

from src.config import METADATA_FILE
from src.config import REVIEWS_FILE


class DataLoader:

    def __init__(self):

        self.metadata = None

        self.reviews = None

    def load(self):

        print("=" * 60)
        print("Loading Datasets")
        print("=" * 60)

        self.metadata = pd.read_csv(METADATA_FILE)

        self.reviews = pd.read_csv(REVIEWS_FILE)

        print("Metadata Loaded Successfully")

        print("Reviews Loaded Successfully")

        return self.metadata, self.reviews

    def summary(self):

        print("\nRestaurant Metadata")

        print(self.metadata.info())

        print("\nRestaurant Reviews")

        print(self.reviews.info())


if __name__ == "__main__":

    loader = DataLoader()

    metadata, reviews = loader.load()

    loader.summary()