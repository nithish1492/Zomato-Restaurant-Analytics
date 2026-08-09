"""
=========================================================
Project : Zomato Restaurant Analysis and Clustering
Module  : K-Means Clustering
=========================================================
"""

import joblib
import matplotlib.pyplot as plt
import pandas as pd

from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.metrics import (
    silhouette_score,
    davies_bouldin_score,
    calinski_harabasz_score
)

from src.config import (
    FIGURES,
    KMEANS_MODEL,
    CLUSTER_DATA,
    PCA_DATA
)


class RestaurantClustering:

    def __init__(self, original_df, scaled_df):

        self.original_df = original_df.copy()
        self.scaled_df = scaled_df.copy()

        self.model = None

    # ---------------------------------------------------
    # Elbow Method
    # ---------------------------------------------------

    def elbow_method(self):

        inertia = []

        print("\nFinding Optimal Number of Clusters...\n")

        for k in range(2, 11):

            model = KMeans(
                n_clusters=k,
                random_state=42,
                n_init=10
            )

            model.fit(self.scaled_df)

            inertia.append(model.inertia_)

        plt.figure(figsize=(8,5))

        plt.plot(
            range(2,11),
            inertia,
            marker="o"
        )

        plt.title("Elbow Method")

        plt.xlabel("Number of Clusters")

        plt.ylabel("Inertia")

        plt.grid(True)

        plt.savefig(
            FIGURES / "elbow_method.png",
            dpi=300
        )

        plt.close()

        print("Elbow Method Saved Successfully.")

    # ---------------------------------------------------
    # Train
    # ---------------------------------------------------

    def train(self, n_clusters=4):

        print("\nTraining KMeans...\n")

        self.model = KMeans(
            n_clusters=n_clusters,
            random_state=42,
            n_init=10
        )

        self.original_df["cluster"] = self.model.fit_predict(
            self.scaled_df
        )

        print("Training Completed.")

    # ---------------------------------------------------
    # Evaluation
    # ---------------------------------------------------

    def evaluate(self):

        labels = self.original_df["cluster"]

        silhouette = silhouette_score(
            self.scaled_df,
            labels
        )

        davies = davies_bouldin_score(
            self.scaled_df,
            labels
        )

        calinski = calinski_harabasz_score(
            self.scaled_df,
            labels
        )

        print("\n==============================")
        print("MODEL EVALUATION")
        print("==============================")

        print(f"Silhouette Score        : {silhouette:.4f}")
        print(f"Davies-Bouldin Index    : {davies:.4f}")
        print(f"Calinski-Harabasz Score : {calinski:.2f}")

    # ---------------------------------------------------
    # PCA
    # ---------------------------------------------------

    def pca_visualization(self):

        pca = PCA(n_components=2)

        components = pca.fit_transform(
            self.scaled_df
        )

        pca_df = pd.DataFrame(

            components,

            columns=["PC1", "PC2"]

        )

        pca_df["cluster"] = self.original_df["cluster"]

        plt.figure(figsize=(10,7))

        plt.scatter(

            pca_df["PC1"],

            pca_df["PC2"],

            c=pca_df["cluster"]

        )

        plt.title("Restaurant Cluster Visualization")

        plt.xlabel("Principal Component 1")

        plt.ylabel("Principal Component 2")

        plt.savefig(
            FIGURES / "cluster_visualization.png",
            dpi=300
        )

        plt.close()

        pca_df.to_csv(
            PCA_DATA,
            index=False
        )

        print("PCA Visualization Saved.")

    # ---------------------------------------------------
    # Cluster Profile
    # ---------------------------------------------------

    def cluster_profile(self):

        summary = self.original_df.groupby("cluster").agg({

            "average_rating":"mean",

            "average_cost":"mean",

            "review_count":"mean",

            "positive_percent":"mean",

            "negative_percent":"mean",

            "neutral_percent":"mean"

        }).round(2)

        print("\n==============================")

        print("CLUSTER PROFILE")

        print("==============================")

        print(summary)

        summary.to_csv(
            "data/processed/cluster_summary.csv"
        )

    # ---------------------------------------------------
    # Save
    # ---------------------------------------------------

    def save(self):

        self.original_df.to_csv(
            CLUSTER_DATA,
            index=False
        )

        joblib.dump(
            self.model,
            KMEANS_MODEL
        )

        print("\nCluster Dataset Saved.")

        print("Model Saved.")

    # ---------------------------------------------------
    # Run
    # ---------------------------------------------------

    def run(self):

        self.elbow_method()

        self.train()

        self.evaluate()

        self.pca_visualization()

        self.cluster_profile()

        self.save()