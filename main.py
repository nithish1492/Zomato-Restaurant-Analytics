from src.data_loader import DataLoader
from src.data_validation import DataValidator
from src.data_cleaning import DataCleaner
from src.data_merging import DataMerger
from src.outlier_analysis import OutlierAnalysis
from src.exploratory_analysis import EDA
from src.sentiment_analysis import SentimentAnalyzer
from src.feature_engineering import FeatureEngineering
from src.preprocessing import DataPreprocessor
from src.clustering import RestaurantClustering
from src.evaluation import ClusterEvaluation
from src.prediction import RestaurantPredictor


def main():

    # ------------------------------
    # Load Data
    # ------------------------------

    loader = DataLoader()

    metadata_df, reviews_df = loader.load()

    # ------------------------------
    # Validate Data
    # ------------------------------

    print("\nVALIDATING DATASETS...\n")

    DataValidator(
        metadata_df,
        "Restaurant Metadata"
    ).generate_report()

    DataValidator(
        reviews_df,
        "Restaurant Reviews"
    ).generate_report()

    # ------------------------------
    # Clean Data
    # ------------------------------

    print("\nCLEANING DATASETS...\n")

    cleaner = DataCleaner(
        metadata_df,
        reviews_df
    )

    metadata_df = cleaner.clean_metadata()

    reviews_df = cleaner.clean_reviews()

    cleaner.save()

    # ------------------------------
    # Merge Data
    # ------------------------------

    print("\nMERGING DATASETS...\n")

    merger = DataMerger(
        metadata_df,
        reviews_df
    )

    merger.compare_restaurants()

    merged_df = merger.merge()

    # ------------------------------
    # Outlier Analysis
    # ------------------------------

    print("\nSTARTING OUTLIER ANALYSIS...\n")

    outlier = OutlierAnalysis(
        merged_df
    )

    outlier.analyze()

    # ------------------------------
    # Exploratory Data Analysis
    # ------------------------------

    print("\nSTARTING EXPLORATORY DATA ANALYSIS...\n")

    eda = EDA(merged_df)

    eda.run()

    # ------------------------------
    # Sentiment Analysis
    # ------------------------------

    print("\nSTARTING SENTIMENT ANALYSIS...\n")

    sentiment = SentimentAnalyzer(merged_df)

    sentiment.clean_reviews()

    sentiment_df = sentiment.predict_sentiment()

    sentiment.summary()

    sentiment.save()

    # ------------------------------
    # Feature Engineering
    # ------------------------------

    print("\nSTARTING FEATURE ENGINEERING...\n")

    feature = FeatureEngineering(sentiment_df)

    feature.prepare()

    restaurant_df = feature.aggregate()

    feature.save()

    # ------------------------------
    # Data Preprocessing
    # ------------------------------

    print("\nSTARTING DATA PREPROCESSING...\n")

    preprocessor = DataPreprocessor(
        restaurant_df
    )

    scaled_df = preprocessor.process()

    # ------------------------------
    # Clustering
    # ------------------------------

    print("\nSTARTING CLUSTERING...\n")

    clustering = RestaurantClustering(
        restaurant_df,
        scaled_df
    )

    clustering.run()

    # ------------------------------
    # Model Evaluation
    # ------------------------------

    print("\nMODEL EVALUATION\n")

    evaluation = ClusterEvaluation(
        clustering.original_df
    )

    evaluation.run()

    # ------------------------------
    # Prediction Test
    # ------------------------------

    choice = input(
        "\nDo you want to test prediction? (y/n): "
    )

    if choice.lower() == "y":

        predictor = RestaurantPredictor()

        predictor.predict()


if __name__ == "__main__":
    main()