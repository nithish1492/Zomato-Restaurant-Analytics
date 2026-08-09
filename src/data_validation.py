"""
=========================================================
Project : Zomato Restaurant Analytics and Clustering
Module  : Data Validation
=========================================================
"""

import pandas as pd


class DataValidator:
    """
    Performs data validation checks on a dataset.
    """

    def __init__(self, dataframe: pd.DataFrame, dataset_name: str):
        self.df = dataframe
        self.dataset_name = dataset_name

    # ----------------------------------------------------
    # Dataset Shape
    # ----------------------------------------------------

    def dataset_shape(self):
        print("\n" + "=" * 60)
        print(f"{self.dataset_name} - Dataset Shape")
        print("=" * 60)

        rows, columns = self.df.shape

        print(f"Rows    : {rows}")
        print(f"Columns : {columns}")

    # ----------------------------------------------------
    # Column Names
    # ----------------------------------------------------

    def column_names(self):
        print("\n" + "=" * 60)
        print(f"{self.dataset_name} - Column Names")
        print("=" * 60)

        for index, column in enumerate(self.df.columns, start=1):
            print(f"{index}. {column}")

    # ----------------------------------------------------
    # Data Types
    # ----------------------------------------------------

    def data_types(self):
        print("\n" + "=" * 60)
        print(f"{self.dataset_name} - Data Types")
        print("=" * 60)

        print(self.df.dtypes)

    # ----------------------------------------------------
    # Missing Values
    # ----------------------------------------------------

    def missing_values(self):
        print("\n" + "=" * 60)
        print(f"{self.dataset_name} - Missing Values")
        print("=" * 60)

        missing = self.df.isnull().sum()

        print(missing)

    # ----------------------------------------------------
    # Duplicate Records
    # ----------------------------------------------------

    def duplicate_records(self):
        print("\n" + "=" * 60)
        print(f"{self.dataset_name} - Duplicate Records")
        print("=" * 60)

        duplicates = self.df.duplicated().sum()

        print(f"Duplicate Rows : {duplicates}")

    # ----------------------------------------------------
    # Unique Values
    # ----------------------------------------------------

    def unique_values(self):
        print("\n" + "=" * 60)
        print(f"{self.dataset_name} - Unique Values")
        print("=" * 60)

        for column in self.df.columns:

            unique = self.df[column].nunique()

            print(f"{column:<25} : {unique}")

    # ----------------------------------------------------
    # Dataset Information
    # ----------------------------------------------------

    def dataset_info(self):
        print("\n" + "=" * 60)
        print(f"{self.dataset_name} - Dataset Information")
        print("=" * 60)

        self.df.info()

    # ----------------------------------------------------
    # Statistical Summary
    # ----------------------------------------------------

    def statistical_summary(self):
        print("\n" + "=" * 60)
        print(f"{self.dataset_name} - Statistical Summary")
        print("=" * 60)

        print(self.df.describe(include="all").transpose())

    # ----------------------------------------------------
    # Memory Usage
    # ----------------------------------------------------

    def memory_usage(self):
        print("\n" + "=" * 60)
        print(f"{self.dataset_name} - Memory Usage")
        print("=" * 60)

        memory = self.df.memory_usage(deep=True).sum() / 1024

        print(f"{memory:.2f} KB")

    # ----------------------------------------------------
    # Complete Report
    # ----------------------------------------------------

    def generate_report(self):

        self.dataset_shape()

        self.column_names()

        self.data_types()

        self.dataset_info()

        self.missing_values()

        self.duplicate_records()

        self.unique_values()

        self.memory_usage()

        self.statistical_summary()