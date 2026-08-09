"""
=========================================================
Project : Zomato Restaurant Analytics and Clustering
Module  : Sentiment Analysis
=========================================================
"""

import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from src.config import SENTIMENT_DATA


class SentimentAnalyzer:

    def __init__(self, dataframe):

        self.df = dataframe.copy()

        self.analyzer = SentimentIntensityAnalyzer()

    # ---------------------------------------------------
    # Clean Reviews
    # ---------------------------------------------------

    def clean_reviews(self):

        self.df["review"] = (
            self.df["review"]
            .fillna("")
            .astype(str)
            .str.strip()
        )

    # ---------------------------------------------------
    # Predict Sentiment
    # ---------------------------------------------------

    def predict_sentiment(self):

        sentiments = []
        scores = []

        total_reviews = len(self.df)

        print(f"\nProcessing {total_reviews} reviews...\n")

        for index, review in enumerate(self.df["review"]):

            result = self.analyzer.polarity_scores(str(review))

            compound = result["compound"]

            scores.append(compound)

            if compound >= 0.05:
                sentiments.append("Positive")

            elif compound <= -0.05:
                sentiments.append("Negative")

            else:
                sentiments.append("Neutral")

            if (index + 1) % 1000 == 0:
                print(f"Processed {index + 1}/{total_reviews} reviews")

        self.df["sentiment"] = sentiments
        self.df["sentiment_score"] = scores

        print("\nSentiment Analysis Completed Successfully.")

        return self.df

    # ---------------------------------------------------
    # Summary
    # ---------------------------------------------------

    def summary(self):

        print("\nSentiment Distribution")

        print(self.df["sentiment"].value_counts())

        print("\nPercentage")

        print(
            round(
                self.df["sentiment"].value_counts(normalize=True) * 100,
                2
            )
        )

    # ---------------------------------------------------
    # Save Dataset
    # ---------------------------------------------------

    def save(self):

        self.df.to_csv(
            SENTIMENT_DATA,
            index=False
        )

        print("\nSentiment dataset saved successfully.")