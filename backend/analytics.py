"""
NEXORA — Analytics Module
=========================
Performs statistical modeling and dataset aggregations using NumPy and Pandas.
"""

import numpy as np
import pandas as pd
from config import SUBJECTS, MIN_PASSING_MARK_PER_SUBJECT, MIN_ATTENDANCE_PERCENTAGE


def get_class_statistics(df):
    """
    Computes overall cohort academic statistics using NumPy and Pandas.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.

    Returns:
        dict: Class statistics dictionary.
    """
    total_students = len(df)
    if total_students == 0:
        return {}

    averages = df["Average"].to_numpy()
    attendances = df["Attendance"].to_numpy()

    pass_count = int(np.sum(df["Result"].to_numpy() == "PASS"))
    fail_count = total_students - pass_count
    pass_percentage = round((pass_count / total_students) * 100, 2)

    stats = {
        "total_students": total_students,
        "class_average": round(float(np.mean(averages)), 2),
        "highest_average": round(float(np.max(averages)), 2),
        "lowest_average": round(float(np.min(averages)), 2),
        "median": round(float(np.median(averages)), 2),
        "std_dev": round(float(np.std(averages)), 2),
        "pass_count": pass_count,
        "fail_count": fail_count,
        "pass_percentage": pass_percentage,
        "average_attendance": round(float(np.mean(attendances)), 2)
    }
    return stats


def get_subject_statistics(df):
    """
    Calculates detailed performance metrics for each curriculum subject.

    Parameters:
        df (pd.DataFrame): Student dataset with subject score columns.

    Returns:
        dict: Mapping of each subject to its statistical summary + best/weakest keys.
    """
    total_students = len(df)
    subject_details = {}

    for subject in SUBJECTS:
        scores = df[subject].to_numpy()
        passed_count = int(np.sum(scores >= MIN_PASSING_MARK_PER_SUBJECT))
        below_passing = int(np.sum(scores < MIN_PASSING_MARK_PER_SUBJECT))
        pass_pct = round((passed_count / total_students) * 100, 2) if total_students > 0 else 0.0

        subject_details[subject] = {
            "name": subject.replace("_", " "),
            "average": round(float(np.mean(scores)), 2),
            "highest": int(np.max(scores)),
            "lowest": int(np.min(scores)),
            "pass_percentage": pass_pct,
            "below_passing_count": below_passing
        }

    # Identify Best and Weakest Subject based on average
    sorted_by_avg = sorted(subject_details.items(), key=lambda item: item[1]["average"], reverse=True)
    best_subject = sorted_by_avg[0][0]
    weakest_subject = sorted_by_avg[-1][0]

    return {
        "subjects": subject_details,
        "best_subject": best_subject,
        "best_subject_name": subject_details[best_subject]["name"],
        "best_subject_avg": subject_details[best_subject]["average"],
        "weakest_subject": weakest_subject,
        "weakest_subject_name": subject_details[weakest_subject]["name"],
        "weakest_subject_avg": subject_details[weakest_subject]["average"]
    }


def get_top_performers(df, n=5):
    """
    Returns the top N performing students based on Average marks.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.
        n (int): Number of top students to return.

    Returns:
        pd.DataFrame: Top N students sorted by Average descending.
    """
    return df.sort_values(by="Average", ascending=False).head(n)


def get_lowest_performers(df, n=5):
    """
    Returns the lowest N performing students based on Average marks.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.
        n (int): Number of students to return.

    Returns:
        pd.DataFrame: Lowest N students sorted by Average ascending.
    """
    return df.sort_values(by="Average", ascending=True).head(n)


def get_department_statistics(df):
    """
    Aggregates performance statistics grouped by academic department.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.

    Returns:
        pd.DataFrame: Department summary table.
    """
    dept_stats = df.groupby("Department").agg(
        Total_Students=("Student_ID", "count"),
        Average_Score=("Average", lambda x: round(np.mean(x), 2)),
        Average_Attendance=("Attendance", lambda x: round(np.mean(x), 2)),
        Pass_Count=("Result", lambda x: int(np.sum(x == "PASS"))),
    ).reset_index()

    dept_stats["Pass_Percentage"] = np.round(
        (dept_stats["Pass_Count"] / dept_stats["Total_Students"]) * 100, 2
    )

    return dept_stats.sort_values(by="Average_Score", ascending=False)


def get_grade_distribution(df):
    """
    Counts students assigned to each letter grade.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame with 'Grade' column.

    Returns:
        dict: Grade frequency dictionary (A+, A, B, C, D, E, F).
    """
    grade_order = ["A+", "A", "B", "C", "D", "E", "F"]
    counts = df["Grade"].value_counts().to_dict()
    return {g: counts.get(g, 0) for g in grade_order}


def get_attendance_analysis(df):
    """
    Analyzes attendance distribution tiers and shortage counts.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.

    Returns:
        dict: Attendance summary tiers.
    """
    attendances = df["Attendance"].to_numpy()
    return {
        "average_attendance": round(float(np.mean(attendances)), 2),
        "above_90": int(np.sum(attendances >= 90)),
        "between_75_and_89": int(np.sum((attendances >= 75) & (attendances < 90))),
        "below_75_shortage": int(np.sum(attendances < MIN_ATTENDANCE_PERCENTAGE)),
        "critical_below_65": int(np.sum(attendances < 65))
    }


def get_students_requiring_attention(df):
    """
    Filters students requiring academic or attendance intervention.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.

    Returns:
        pd.DataFrame: At-risk students sorted by Average ascending.
    """
    at_risk = df[
        (df["Performance_Status"] == "AT RISK") |
        (df["Result"] == "FAIL") |
        (df["Risk_Level"].isin(["Critical", "High"]))
    ]
    return at_risk.sort_values(by="Average", ascending=True)


if __name__ == "__main__":
    from data_loader import load_student_data
    from calculations import process_all_calculations
    from recommendations import add_recommendations_to_dataframe

    raw = load_student_data()
    processed = process_all_calculations(raw)
    with_recs = add_recommendations_to_dataframe(processed)

    print("--- CLASS STATS ---")
    print(get_class_statistics(with_recs))

    print("\n--- SUBJECT STATS ---")
    print(get_subject_statistics(with_recs))

    print("\n--- TOP 3 PERFORMERS ---")
    print(get_top_performers(with_recs, 3)[["Student_ID", "Name", "Average", "Grade", "Result"]])
