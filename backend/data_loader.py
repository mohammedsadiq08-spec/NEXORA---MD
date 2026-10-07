"""
NEXORA — Data Loader Module
===========================
Loads and validates student academic datasets from CSV files using Pandas.
"""

from pathlib import Path
import pandas as pd
from config import DEFAULT_DATA_PATH, REQUIRED_COLUMNS, SUBJECTS


def load_student_data(file_path=DEFAULT_DATA_PATH):
    """
    Loads student data from a CSV file into a Pandas DataFrame.
    Validates required columns and checks for missing or invalid values.

    Parameters:
        file_path (str or Path): Path to the students CSV file.

    Returns:
        pd.DataFrame: Cleaned and validated student dataset.

    Raises:
        FileNotFoundError: If the CSV file does not exist.
        ValueError: If required columns are missing or data types are invalid.
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"[Error] Dataset file not found at: {path}")

    try:
        # Load CSV using Pandas
        df = pd.read_csv(path)
    except Exception as e:
        raise ValueError(f"[Error] Failed to parse CSV file: {e}")

    # Validate presence of all required raw columns
    missing_columns = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing_columns:
        raise ValueError(f"[Error] Missing required column(s) in CSV: {missing_columns}")

    # Ensure numeric columns are properly formatted
    numeric_columns = SUBJECTS + ["Attendance"]
    for col in numeric_columns:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    # Check for NaN values in numeric columns
    nan_count = df[numeric_columns].isna().sum().sum()
    if nan_count > 0:
        print(f"[Warning] Found {nan_count} non-numeric/missing value(s). Filling with 0.")
        df[numeric_columns] = df[numeric_columns].fillna(0)

    return df


def get_dataset_info(df):
    """
    Displays and returns key structural information about the dataset.

    Parameters:
        df (pd.DataFrame): Student DataFrame.

    Returns:
        dict: Dataset shape, column names, and department counts.
    """
    info = {
        "total_rows": len(df),
        "total_columns": len(df.columns),
        "columns": list(df.columns),
        "departments": df["Department"].value_counts().to_dict(),
        "semesters": df["Semester"].value_counts().to_dict()
    }
    return info


if __name__ == "__main__":
    # Self-test loader
    print("Testing data_loader.py...")
    try:
        students_df = load_student_data()
        info = get_dataset_info(students_df)
        print(f"✓ Loaded {info['total_rows']} records successfully.")
        print(f"✓ Departments: {info['departments']}")
    except Exception as error:
        print(f"✗ Load failed: {error}")
