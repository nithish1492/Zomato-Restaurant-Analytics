"""
=========================================================
Project : Zomato Restaurant Analytics and Clustering
Module  : Visualization
=========================================================
"""

from pathlib import Path

import matplotlib.pyplot as plt
import seaborn as sns

from src.config import FIGURES

# Create figures folder automatically
Path(FIGURES).mkdir(parents=True, exist_ok=True)

# Theme
sns.set_style("whitegrid")
plt.rcParams["figure.figsize"] = (10, 6)


def save_plot(filename: str):

    plt.tight_layout()

    plt.savefig(
        FIGURES / filename,
        dpi=300,
        bbox_inches="tight"
    )

    # Don't block the program
    plt.close()