import matplotlib.pyplot as plt
import seaborn as sns

class OutlierAnalysis:

    def __init__(self, df):
        self.df = df

    def analyze(self):

        print("\nOUTLIER ANALYSIS\n")

        numeric_columns = [
            "cost",
            "rating"
        ]

        # Convert columns to numeric
        self.df["cost"] = (
            self.df["cost"]
            .astype(str)
            .str.replace(",", "", regex=False)
        )
        self.df["cost"] = self.df["cost"].astype(float)

        self.df["rating"] = self.df["rating"].replace("Like", None)
        self.df["rating"] = self.df["rating"].astype(float)

        for col in numeric_columns:

            plt.figure(figsize=(8,5))

            sns.boxplot(x=self.df[col])

            plt.title(f"Boxplot of {col}")

            plt.savefig(
                f"reports/figures/{col}_outliers.png",
                dpi=300,
                bbox_inches="tight"
            )

            plt.close()

            Q1 = self.df[col].quantile(0.25)
            Q3 = self.df[col].quantile(0.75)

            IQR = Q3 - Q1

            lower = Q1 - 1.5 * IQR
            upper = Q3 + 1.5 * IQR

            outliers = self.df[
                (self.df[col] < lower) |
                (self.df[col] > upper)
            ]

            print(f"{col}")

            print(f"Outliers : {len(outliers)}")

            print("------------------------")

        print("Outlier Analysis Completed.")