"""
=========================================================
Project : Zomato Restaurant Analysis and Clustering
Module  : Model Evaluation
=========================================================
"""

import pandas as pd


class ClusterEvaluation:

    def __init__(self, dataframe):

        self.df = dataframe.copy()

    # ---------------------------------------------------
    # Cluster Statistics
    # ---------------------------------------------------

    def cluster_statistics(self):

        print("\n" + "=" * 60)
        print("CLUSTER STATISTICS")
        print("=" * 60)

        stats = self.df.groupby("cluster").agg({

            "average_rating": "mean",

            "average_cost": "mean",

            "review_count": "mean",

            "positive_percent": "mean",

            "negative_percent": "mean",

            "neutral_percent": "mean"

        }).round(2)

        print(stats)

        stats.to_csv(
            "data/processed/cluster_statistics.csv"
        )

        return stats

    # ---------------------------------------------------
    # Cluster Size
    # ---------------------------------------------------

    def cluster_size(self):

        print("\n" + "=" * 60)
        print("NUMBER OF RESTAURANTS")
        print("=" * 60)

        print(

            self.df["cluster"].value_counts()

        )

    # ---------------------------------------------------
    # Business Interpretation
    # ---------------------------------------------------

    def business_summary(self):

        print("\n" + "=" * 60)
        print("BUSINESS SUMMARY")
        print("=" * 60)

        for cluster in sorted(self.df["cluster"].unique()):

            subset = self.df[self.df["cluster"] == cluster]

            print(f"\nCluster {cluster}")

            print(f"Restaurants : {len(subset)}")

            print(f"Average Rating : {subset['average_rating'].mean():.2f}")

            print(f"Average Cost : ₹{subset['average_cost'].mean():.0f}")

            print(f"Positive Reviews : {subset['positive_percent'].mean():.2f}%")

    # ---------------------------------------------------

    def run(self):

        self.cluster_statistics()

        self.cluster_size()

        self.business_summary()