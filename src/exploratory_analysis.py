"""
=========================================================
Project : Zomato Restaurant Analytics and Clustering
Module  : Exploratory Data Analysis
=========================================================
"""

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from src.visualization import save_plot


class EDA:

    def __init__(self, merged_df):

        self.df = merged_df.copy()

    # ---------------------------------------------------
    # Dataset Overview
    # ---------------------------------------------------

    def dataset_overview(self):

        print("\n")
        print("=" * 60)
        print("Merged Dataset Overview")
        print("=" * 60)

        print(self.df.shape)

        print()

        print(self.df.info())

    # ---------------------------------------------------
    # Rating Distribution
    # ---------------------------------------------------

    def rating_distribution(self):

        plt.figure(figsize=(8,5))

        sns.countplot(
            x="rating",
            data=self.df,
            order=sorted(self.df["rating"].dropna().unique())
        )

        plt.title("Rating Distribution")

        plt.xlabel("Rating")

        plt.ylabel("Number of Reviews")

        save_plot("rating_distribution.png")

    # ---------------------------------------------------
    # Cost Distribution
    # ---------------------------------------------------

    def cost_distribution(self):

        cost = self.df.copy()

        cost["cost"] = (
            cost["cost"]
            .astype(str)
            .str.replace(",", "", regex=False)
        )

        cost["cost"] = pd.to_numeric(
            cost["cost"],
            errors="coerce"
        )

        plt.figure(figsize=(10,6))

        sns.histplot(
            cost["cost"],
            bins=20,
            kde=True
        )

        plt.title("Restaurant Cost Distribution")

        plt.xlabel("Average Cost")

        plt.ylabel("Frequency")

        save_plot("cost_distribution.png")

    # ---------------------------------------------------
    # Top Cuisines
    # ---------------------------------------------------

    def top_cuisines(self):

        cuisines = (
            self.df["cuisines"]
            .value_counts()
            .head(10)
        )

        plt.figure(figsize=(12,6))

        sns.barplot(
            x=cuisines.values,
            y=cuisines.index
        )

        plt.title("Top 10 Restaurant Cuisines")

        plt.xlabel("Number of Restaurants")

        plt.ylabel("Cuisine")

        save_plot("top_cuisines.png")

    # ---------------------------------------------------
    # Top Reviewed Restaurants
    # ---------------------------------------------------

    def top_restaurants(self):

        restaurants = (
            self.df["restaurant"]
            .value_counts()
            .head(10)
        )

        plt.figure(figsize=(12,6))

        sns.barplot(
            x=restaurants.values,
            y=restaurants.index
        )

        plt.title("Top 10 Most Reviewed Restaurants")

        plt.xlabel("Reviews")

        plt.ylabel("Restaurant")

        save_plot("top_reviewed_restaurants.png")

    # ---------------------------------------------------
    # Run Complete EDA
    # ---------------------------------------------------

    def run(self):

        self.dataset_overview()

        self.rating_distribution()

        self.cost_distribution()

        self.top_cuisines()

        self.top_restaurants()

        print("\nEDA Completed Successfully.")