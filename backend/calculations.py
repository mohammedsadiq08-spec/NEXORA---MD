"""
NEXORA — Calculations Module
============================
Performs student academic calculations: total marks, averages, letter grades,
academic results (PASS/FAIL), and performance categorization.
"""

import numpy as np
import pandas as pd
from config import (
    SUBJECTS,
    GRADE_RULES,
    MIN_PASSING_MARK_PER_SUBJECT,
    MIN_PASSING_AVERAGE,
    MIN_ATTENDANCE_PERCENTAGE,
    STATUS_EXCELLENT_AVG,
    STATUS_EXCELLENT_ATT,
    STATUS_GOOD_AVG,
    STATUS_GOOD_ATT,
    STATUS_NEEDS_IMPROVEMENT_AVG,
    STATUS_NEEDS_IMPROVEMENT_ATT
)


def calculate_total(df):
    """
    Calculates total marks across all subjects for each student.

    Parameters:
        df (pd.DataFrame): DataFrame containing subject columns.

    Returns:
        pd.Series: Total marks for each student.
    """
    subject_marks = df[SUBJECTS].to_numpy()
    totals = np.sum(subject_marks, axis=1)
    return pd.Series(totals, index=df.index, name="Total_Marks")


def calculate_average(df):
    """
    Calculates the average percentage score across subjects for each student.

    Parameters:
        df (pd.DataFrame): DataFrame containing subject columns.

    Returns:
        pd.Series: Average percentage rounded to 2 decimal places.
    """
    subject_marks = df[SUBJECTS].to_numpy()
    averages = np.mean(subject_marks, axis=1)
    return pd.Series(np.round(averages, 2), index=df.index, name="Average")


def assign_grade(average):
    """
    Assigns a letter grade (A+, A, B, C, D, E, F) based on average mark.

    Parameters:
        average (float): Average score of the student.

    Returns:
        str: Letter grade.
    """
    for lower_bound, upper_bound, grade in GRADE_RULES:
        if lower_bound <= average <= upper_bound:
            return grade
    return "F"


def check_result(row):
    """
    Evaluates whether a student has PASSED or FAILED.

    PASS Criteria:
      1. Average >= 40.0
      2. Every individual subject mark >= 35
      3. Attendance >= 75.0%

    Parameters:
        row (pd.Series or dict): Student data row.

    Returns:
        str: 'PASS' or 'FAIL'.
    """
    # Check attendance
    if row["Attendance"] < MIN_ATTENDANCE_PERCENTAGE:
        return "FAIL"

    # Check overall average
    if row["Average"] < MIN_PASSING_AVERAGE:
        return "FAIL"

    # Check individual subject minimum threshold
    for subject in SUBJECTS:
        if row[subject] < MIN_PASSING_MARK_PER_SUBJECT:
            return "FAIL"

    return "PASS"


def get_performance_status(average, attendance):
    """
    Categorizes student performance status into:
    'EXCELLENT', 'GOOD', 'NEEDS IMPROVEMENT', or 'AT RISK'.

    Rules:
      - EXCELLENT: Average >= 85 AND Attendance >= 90
      - GOOD: Average >= 70 AND Attendance >= 80
      - NEEDS IMPROVEMENT: Average >= 50 AND Attendance >= 75
      - AT RISK: Average < 50 OR Attendance < 75

    Parameters:
        average (float): Student's average score.
        attendance (float): Student's attendance percentage.

    Returns:
        str: Performance category string.
    """
    if average >= STATUS_EXCELLENT_AVG and attendance >= STATUS_EXCELLENT_ATT:
        return "EXCELLENT"
    elif average >= STATUS_GOOD_AVG and attendance >= STATUS_GOOD_ATT:
        return "GOOD"
    elif average >= STATUS_NEEDS_IMPROVEMENT_AVG and attendance >= STATUS_NEEDS_IMPROVEMENT_ATT:
        return "NEEDS IMPROVEMENT"
    else:
        return "AT RISK"


def process_all_calculations(df):
    """
    Enriches the student DataFrame with all computed metrics:
    - Total_Marks
    - Average
    - Grade
    - Result
    - Performance_Status

    Parameters:
        df (pd.DataFrame): Raw student dataset.

    Returns:
        pd.DataFrame: Enriched DataFrame with all computed columns.
    """
    processed_df = df.copy()

    # Calculate Totals and Averages using NumPy-powered functions
    processed_df["Total_Marks"] = calculate_total(processed_df)
    processed_df["Average"] = calculate_average(processed_df)

    # Assign Grades
    processed_df["Grade"] = processed_df["Average"].apply(assign_grade)

    # Check Results (PASS / FAIL)
    processed_df["Result"] = processed_df.apply(check_result, axis=1)

    # Assign Performance Status
    processed_df["Performance_Status"] = processed_df.apply(
        lambda row: get_performance_status(row["Average"], row["Attendance"]),
        axis=1
    )

    return processed_df


if __name__ == "__main__":
    from data_loader import load_student_data
    print("Testing calculations.py...")
    raw = load_student_data()
    calculated = process_all_calculations(raw)
    print(calculated[["Student_ID", "Name", "Average", "Grade", "Result", "Performance_Status"]].head())
