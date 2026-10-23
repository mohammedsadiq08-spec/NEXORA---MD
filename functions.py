"""
NEXORA — Student Performance Analytics System
==============================================
Module: functions.py
Description: Core reusable functions for data loading, data validation,
             academic mark calculations, statistical analysis, ranking,
             and rule-based recommendations using Python, NumPy, and Pandas.
"""

from pathlib import Path
from typing import Dict, List, Tuple, Union, Any
import numpy as np
import pandas as pd

# ==============================================================================
# CONFIGURATION & ACADEMIC BENCHMARKS
# Note: Defined as the project's chosen academic evaluation rules.
# ==============================================================================

# Base Directory Resolution (Works regardless of current terminal working directory)
BASE_DIR = Path(__file__).resolve().parent
DEFAULT_DATA_FILE = BASE_DIR / "students.csv"
FALLBACK_DATA_FILE = BASE_DIR / "data" / "students.csv"

# Academic Subjects Analyzed
SUBJECTS: List[str] = [
    "Python",
    "Artificial_Intelligence",
    "SQL",
    "Mathematics",
    "Computer_Networks"
]

# Required Raw CSV Schema
REQUIRED_COLUMNS: List[str] = [
    "Student_ID",
    "Name",
    "Department",
    "Semester"
] + SUBJECTS + ["Attendance"]

# Academic Evaluation Rules
MAX_MARK_PER_SUBJECT: int = 100
MAX_TOTAL_MARKS: int = len(SUBJECTS) * MAX_MARK_PER_SUBJECT  # 500

MIN_PASSING_MARK_PER_SUBJECT: int = 35  # Must score >= 35 in each subject
MIN_PASSING_AVERAGE: float = 40.0       # Cumulative average must be >= 40.0%
MIN_ATTENDANCE_PERCENTAGE: float = 75.0 # Attendance must be >= 75.0%

# Performance Status Benchmarks
STATUS_EXCELLENT_AVG: float = 85.0
STATUS_EXCELLENT_ATT: float = 90.0

STATUS_GOOD_AVG: float = 70.0
STATUS_GOOD_ATT: float = 80.0

STATUS_NEEDS_IMP_AVG: float = 50.0
STATUS_NEEDS_IMP_ATT: float = 75.0

# Subject Focus Alert Benchmark
SUBJECT_ALERT_THRESHOLD: float = 50.0


# ==============================================================================
# 1. DATA LOADING & VALIDATION
# ==============================================================================

def load_student_data(file_path: Union[str, Path, None] = None) -> pd.DataFrame:
    """
    Loads student records from a CSV file into a Pandas DataFrame.
    Searches default project paths if no path is explicitly provided.

    Parameters:
        file_path (str or Path, optional): Custom file path to students.csv.

    Returns:
        pd.DataFrame: Raw loaded student dataset.

    Raises:
        FileNotFoundError: If the CSV file cannot be located.
        ValueError: If the file is empty or cannot be parsed.
    """
    target_path = None
    if file_path:
        target_path = Path(file_path)
    elif DEFAULT_DATA_FILE.exists():
        target_path = DEFAULT_DATA_FILE
    elif FALLBACK_DATA_FILE.exists():
        target_path = FALLBACK_DATA_FILE
    else:
        target_path = DEFAULT_DATA_FILE

    if not target_path.exists():
        raise FileNotFoundError(
            f"[Error] Dataset file not found at '{target_path}'. "
            f"Please verify 'students.csv' exists in the project root or 'data/' folder."
        )

    try:
        df = pd.read_csv(target_path)
    except Exception as exc:
        raise ValueError(f"[Error] Failed to read CSV file '{target_path}': {exc}") from exc

    if df.empty:
        raise ValueError(f"[Error] The dataset '{target_path}' is completely empty.")

    # Validate dataset integrity
    is_valid, error_messages = validate_student_data(df)
    if not is_valid:
        error_summary = "\n - ".join(error_messages)
        raise ValueError(f"[Error] Dataset validation failed:\n - {error_summary}")

    return df


def validate_student_data(df: pd.DataFrame) -> Tuple[bool, List[str]]:
    """
    Validates the dataset for required columns, duplicate IDs, missing values,
    and out-of-range marks or attendance percentages.
    Does NOT silently treat missing values as zero.

    Parameters:
        df (pd.DataFrame): DataFrame to inspect.

    Returns:
        tuple: (bool is_valid, list of error messages)
    """
    errors: List[str] = []

    # 1. Check for required columns
    missing_cols = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing_cols:
        errors.append(f"Missing required columns: {missing_cols}")
        return False, errors  # Cannot proceed with further checks if columns are missing

    # 2. Check for missing values (NaN / nulls)
    null_counts = df[REQUIRED_COLUMNS].isna().sum()
    cols_with_nulls = null_counts[null_counts > 0]
    if not cols_with_nulls.empty:
        null_details = ", ".join([f"{col}: {count} missing" for col, count in cols_with_nulls.items()])
        errors.append(f"Missing (NaN) values detected ({null_details}). Missing marks must not be silent.")

    # 3. Check for duplicate Student_IDs
    duplicate_ids = df[df["Student_ID"].duplicated()]["Student_ID"].tolist()
    if duplicate_ids:
        errors.append(f"Duplicate Student_ID values found: {duplicate_ids}")

    # 4. Check data types and value ranges for marks (0 to 100)
    for subject in SUBJECTS:
        if not pd.api.types.is_numeric_dtype(df[subject]):
            errors.append(f"Column '{subject}' contains non-numeric values.")
        else:
            out_of_bounds = df[(df[subject] < 0) | (df[subject] > MAX_MARK_PER_SUBJECT)]
            if not out_of_bounds.empty:
                errors.append(
                    f"Column '{subject}' has marks outside 0-{MAX_MARK_PER_SUBJECT} range "
                    f"for Student_ID(s): {out_of_bounds['Student_ID'].tolist()}"
                )

    # 5. Check attendance values (0 to 100)
    if not pd.api.types.is_numeric_dtype(df["Attendance"]):
        errors.append("Column 'Attendance' contains non-numeric values.")
    else:
        invalid_att = df[(df["Attendance"] < 0) | (df["Attendance"] > 100)]
        if not invalid_att.empty:
            errors.append(
                f"Column 'Attendance' has values outside 0-100 range "
                f"for Student_ID(s): {invalid_att['Student_ID'].tolist()}"
            )

    return (len(errors) == 0, errors)


# ==============================================================================
# 2. CORE MARK & GRADE CALCULATIONS
# ==============================================================================

def calculate_total(df: pd.DataFrame) -> pd.Series:
    """
    Calculates total marks scored across all five subjects using NumPy summation.

    Parameters:
        df (pd.DataFrame): DataFrame containing subject columns.

    Returns:
        pd.Series: Integer total marks for each student.
    """
    subject_marks = df[SUBJECTS].to_numpy(dtype=float)
    totals = np.sum(subject_marks, axis=1)
    return pd.Series(totals.astype(int), index=df.index, name="Total_Marks")


def calculate_average(df: pd.DataFrame) -> pd.Series:
    """
    Calculates the average percentage mark across all five subjects using NumPy mean.

    Parameters:
        df (pd.DataFrame): DataFrame containing subject columns.

    Returns:
        pd.Series: Float average marks rounded to 2 decimal places.
    """
    subject_marks = df[SUBJECTS].to_numpy(dtype=float)
    averages = np.mean(subject_marks, axis=1)
    return pd.Series(np.round(averages, 2), index=df.index, name="Average")


def assign_grade(average: float) -> str:
    """
    Assigns a letter grade based on the student's average percentage mark.

    Grading Scale:
        90 to 100:       A+
        80 to below 90:  A
        70 to below 80:  B
        60 to below 70:  C
        50 to below 60:  D
        40 to below 50:  E
        Below 40:        F

    Parameters:
        average (float): Average mark of the student.

    Returns:
        str: Letter grade.
    """
    if average >= 90.0:
        return "A+"
    elif average >= 80.0:
        return "A"
    elif average >= 70.0:
        return "B"
    elif average >= 60.0:
        return "C"
    elif average >= 50.0:
        return "D"
    elif average >= 40.0:
        return "E"
    else:
        return "F"


def check_result(row: Union[pd.Series, Dict[str, Any]]) -> str:
    """
    Evaluates whether a student has PASSED or FAILED based on project rules.

    Pass Condition:
        1. Average mark must be at least 40 (Average >= 40.0)
        2. Every subject mark must be at least 35 (Every subject >= 35)
        3. Attendance must be at least 75% (Attendance >= 75.0)

    A student must satisfy ALL THREE conditions to PASS. Otherwise, FAILS.

    Parameters:
        row (pd.Series or dict): Student data row containing marks and attendance.

    Returns:
        str: 'PASS' or 'FAIL'.
    """
    # 1. Attendance check
    if row["Attendance"] < MIN_ATTENDANCE_PERCENTAGE:
        return "FAIL"

    # 2. Cumulative average check
    if row["Average"] < MIN_PASSING_AVERAGE:
        return "FAIL"

    # 3. Individual subject minimum mark check
    for subject in SUBJECTS:
        if row[subject] < MIN_PASSING_MARK_PER_SUBJECT:
            return "FAIL"

    return "PASS"


def get_performance_status(average: float, attendance: float) -> str:
    """
    Assigns a performance status category based on average marks and attendance.

    Status Rules:
        - AT RISK:           Average < 50 OR Attendance < 75
        - EXCELLENT:         Average >= 85 AND Attendance >= 90
        - GOOD:              Average >= 70 AND Attendance >= 80
        - NEEDS IMPROVEMENT: Average >= 50 AND Attendance >= 75
        - Remaining cases:   NEEDS IMPROVEMENT

    Parameters:
        average (float): Student's average mark.
        attendance (float): Student's attendance percentage.

    Returns:
        str: Status category string.
    """
    # At-risk condition takes priority
    if average < STATUS_NEEDS_IMP_AVG or attendance < STATUS_NEEDS_IMP_ATT:
        return "AT RISK"
    elif average >= STATUS_EXCELLENT_AVG and attendance >= STATUS_EXCELLENT_ATT:
        return "EXCELLENT"
    elif average >= STATUS_GOOD_AVG and attendance >= STATUS_GOOD_ATT:
        return "GOOD"
    elif average >= STATUS_NEEDS_IMP_AVG and attendance >= STATUS_NEEDS_IMP_ATT:
        return "NEEDS IMPROVEMENT"
    else:
        return "NEEDS IMPROVEMENT"


def calculate_student_metrics(df: pd.DataFrame) -> pd.DataFrame:
    """
    Enriches the student DataFrame with all computed metrics:
    - Total_Marks
    - Average
    - Grade
    - Result
    - Performance_Status
    - Rank (Descending by Average, ties handled consistently using 'min')

    Parameters:
        df (pd.DataFrame): Raw student dataset.

    Returns:
        pd.DataFrame: Enriched DataFrame with all computed columns.
    """
    processed = df.copy()

    # 1. Total Marks & Average
    processed["Total_Marks"] = calculate_total(processed)
    processed["Average"] = calculate_average(processed)

    # 2. Grade Assignment
    processed["Grade"] = processed["Average"].apply(assign_grade)

    # 3. Pass / Fail Evaluation
    processed["Result"] = processed.apply(check_result, axis=1)

    # 4. Performance Status
    processed["Performance_Status"] = processed.apply(
        lambda r: get_performance_status(r["Average"], r["Attendance"]),
        axis=1
    )

    # 5. Class Rank (Rank 1 for highest average; 'min' ensures ties share rank, next rank skips)
    processed["Rank"] = processed["Average"].rank(ascending=False, method="min").astype(int)

    return processed


# ==============================================================================
# 3. RULE-BASED RECOMMENDATIONS & RISK REASONS
# ==============================================================================

def generate_recommendations(row: Union[pd.Series, Dict[str, Any]]) -> Tuple[List[str], List[str]]:
    """
    Generates transparent, rule-based diagnostic risk reasons and actionable recommendations.
    Does NOT use machine learning; provides explainable academic feedback.

    Rules:
        - Attendance < 75%: "Improve attendance to meet the defined requirement."
        - Mathematics < 50: "Focus on Mathematics fundamentals and practice."
        - Python < 50: "Strengthen Python fundamentals through regular coding practice."
        - Artificial_Intelligence < 50: "Review core Artificial Intelligence concepts."
        - SQL < 50: "Practice SQL queries and database concepts."
        - Computer_Networks < 50: "Review Computer Networks fundamentals."
        - Average >= 85 and Attendance >= 90: "Maintain performance and consider advanced learning opportunities."

    Parameters:
        row (pd.Series or dict): Student data row with computed metrics.

    Returns:
        tuple: (list of risk reasons, list of recommendations)
    """
    reasons: List[str] = []
    recommendations: List[str] = []

    avg = row["Average"]
    att = row["Attendance"]

    # 1. Attendance evaluation
    if att < 65:
        reasons.append(f"Severe attendance shortage ({att:.1f}%)")
        recommendations.append("Improve attendance to meet the defined requirement.")
    elif att < MIN_ATTENDANCE_PERCENTAGE:
        reasons.append(f"Attendance below 75% threshold ({att:.1f}%)")
        recommendations.append("Improve attendance to meet the defined requirement.")

    # 2. Subject-wise evaluations (< 35 is failure, < 50 is low score)
    subject_advice = {
        "Python": "Strengthen Python fundamentals through regular coding practice.",
        "Artificial_Intelligence": "Review core Artificial Intelligence concepts.",
        "SQL": "Practice SQL queries and database concepts.",
        "Mathematics": "Focus on Mathematics fundamentals and practice.",
        "Computer_Networks": "Review Computer Networks fundamentals."
    }

    for subject in SUBJECTS:
        score = row[subject]
        formatted_name = subject.replace("_", " ")

        if score < MIN_PASSING_MARK_PER_SUBJECT:
            reasons.append(f"Failed {formatted_name} ({score}/100)")
            recommendations.append(subject_advice[subject])
        elif score < SUBJECT_ALERT_THRESHOLD:
            reasons.append(f"Low score in {formatted_name} ({score}/100)")
            recommendations.append(subject_advice[subject])

    # 3. Overall average checks
    if avg < MIN_PASSING_AVERAGE:
        reasons.append(f"Cumulative average below passing mark ({avg:.2f}%)")
    elif avg < 50.0:
        reasons.append(f"Borderline average marks ({avg:.2f}%)")

    # 4. High performance recognition
    if avg >= STATUS_EXCELLENT_AVG and att >= STATUS_EXCELLENT_ATT:
        recommendations.append("Maintain performance and consider advanced learning opportunities.")

    # 5. Fallback for consistent students without active weaknesses
    if not recommendations:
        recommendations.append("Maintain consistent study habits and active peer collaboration.")

    if not reasons:
        reasons.append("Good academic standing; on track.")

    return reasons, recommendations


def add_recommendations_to_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """
    Appends 'Risk_Reasons' and 'Recommendations' formatted text columns to the DataFrame.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.

    Returns:
        pd.DataFrame: DataFrame with diagnostic columns.
    """
    df_out = df.copy()
    reasons_list: List[str] = []
    recs_list: List[str] = []

    for _, row in df_out.iterrows():
        reasons, recs = generate_recommendations(row)
        reasons_list.append("; ".join(reasons))
        recs_list.append("; ".join(recs))

    df_out["Risk_Reasons"] = reasons_list
    df_out["Recommendations"] = recs_list
    return df_out


# ==============================================================================
# 4. STATISTICAL & AGGREGATE ANALYTICS
# ==============================================================================

def get_class_statistics(df: pd.DataFrame) -> Dict[str, Any]:
    """
    Computes overall class analytics using NumPy and Pandas:
    - Total students
    - Class average (Mean of all students' average marks)
    - Highest & lowest student average
    - Median student average (np.median)
    - Standard deviation of student averages (np.std)
    - Pass count, fail count, pass percentage
    - Average attendance
    - Students with attendance below 75%
    - Highest scorer name and lowest scorer name

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.

    Returns:
        dict: Complete class statistics.
    """
    total = len(df)
    if total == 0:
        return {}

    averages = df["Average"].to_numpy(dtype=float)
    attendances = df["Attendance"].to_numpy(dtype=float)

    pass_count = int(np.sum(df["Result"].to_numpy() == "PASS"))
    fail_count = total - pass_count
    pass_pct = round((pass_count / total) * 100, 2)

    att_below_75_count = int(np.sum(attendances < MIN_ATTENDANCE_PERCENTAGE))

    highest_avg = float(np.max(averages))
    lowest_avg = float(np.min(averages))

    highest_row = df.loc[df["Average"].idxmax()]
    lowest_row = df.loc[df["Average"].idxmin()]

    return {
        "total_students": total,
        "class_average": round(float(np.mean(averages)), 2),
        "highest_average": round(highest_avg, 2),
        "lowest_average": round(lowest_avg, 2),
        "highest_student": f"{highest_row['Name']} ({highest_row['Student_ID']})",
        "lowest_student": f"{lowest_row['Name']} ({lowest_row['Student_ID']})",
        "median": round(float(np.median(averages)), 2),
        "std_dev": round(float(np.std(averages)), 2),
        "pass_count": pass_count,
        "fail_count": fail_count,
        "pass_percentage": pass_pct,
        "average_attendance": round(float(np.mean(attendances)), 2),
        "attendance_below_75_count": att_below_75_count
    }


def get_subject_statistics(df: pd.DataFrame) -> Dict[str, Any]:
    """
    Computes subject-wise metrics across the cohort:
    - Subject average mark
    - Highest & lowest mark
    - Number of students below 35 (failed subject)
    - Number of students scoring below 40
    - Subject pass percentage (students with mark >= 35)
    - Identifies best-performing and weakest subjects based on average mark.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.

    Returns:
        dict: Subject statistics mapping and summary identifiers.
    """
    total = len(df)
    subject_data: Dict[str, Dict[str, Any]] = {}

    for subject in SUBJECTS:
        scores = df[subject].to_numpy(dtype=float)
        passed_students = int(np.sum(scores >= MIN_PASSING_MARK_PER_SUBJECT))
        below_35_count = int(np.sum(scores < MIN_PASSING_MARK_PER_SUBJECT))
        below_40_count = int(np.sum(scores < 40))
        subject_pass_pct = round((passed_students / total) * 100, 2) if total > 0 else 0.0

        subject_data[subject] = {
            "name": subject.replace("_", " "),
            "average": round(float(np.mean(scores)), 2),
            "highest": int(np.max(scores)),
            "lowest": int(np.min(scores)),
            "std_dev": round(float(np.std(scores)), 2),
            "below_35": below_35_count,
            "below_40": below_40_count,
            "pass_percentage": subject_pass_pct
        }

    # Best and weakest subject by average mark
    sorted_subjects = sorted(subject_data.items(), key=lambda item: item[1]["average"], reverse=True)
    best_key = sorted_subjects[0][0]
    weakest_key = sorted_subjects[-1][0]

    return {
        "subjects": subject_data,
        "best_subject": best_key,
        "best_subject_name": subject_data[best_key]["name"],
        "best_subject_avg": subject_data[best_key]["average"],
        "weakest_subject": weakest_key,
        "weakest_subject_name": subject_data[weakest_key]["name"],
        "weakest_subject_avg": subject_data[weakest_key]["average"]
    }


def get_top_performers(df: pd.DataFrame, n: int = 5) -> pd.DataFrame:
    """
    Returns the top N students ranked by Average marks in descending order.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.
        n (int): Number of top performers to return (default: 5).

    Returns:
        pd.DataFrame: Top N students with relevant academic columns.
    """
    cols = ["Rank", "Student_ID", "Name", "Department", "Average", "Grade", "Attendance", "Result"]
    available_cols = [c for c in cols if c in df.columns]
    return df.sort_values(by=["Average", "Attendance"], ascending=[False, False]).head(n)[available_cols]


def get_lowest_performers(df: pd.DataFrame, n: int = 5) -> pd.DataFrame:
    """
    Returns the bottom N students based on Average marks in ascending order.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.
        n (int): Number of lowest performers to return (default: 5).

    Returns:
        pd.DataFrame: Lowest N students.
    """
    cols = ["Rank", "Student_ID", "Name", "Department", "Average", "Grade", "Attendance", "Result"]
    available_cols = [c for c in cols if c in df.columns]
    return df.sort_values(by="Average", ascending=True).head(n)[available_cols]


def get_department_statistics(df: pd.DataFrame) -> pd.DataFrame:
    """
    Aggregates performance statistics grouped by academic department:
    - Total students
    - Department average GPA
    - Department average attendance
    - Passing students count
    - Department pass percentage

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.

    Returns:
        pd.DataFrame: Grouped department summary table.
    """
    dept_group = df.groupby("Department").agg(
        Total_Students=("Student_ID", "count"),
        Average_Score=("Average", lambda s: round(float(np.mean(s)), 2)),
        Average_Attendance=("Attendance", lambda a: round(float(np.mean(a)), 2)),
        Pass_Count=("Result", lambda r: int(np.sum(r == "PASS")))
    ).reset_index()

    dept_group["Pass_Percentage"] = np.round(
        (dept_group["Pass_Count"] / dept_group["Total_Students"]) * 100, 2
    )

    return dept_group.sort_values(by="Average_Score", ascending=False)


def get_grade_distribution(df: pd.DataFrame) -> Dict[str, int]:
    """
    Computes frequency distribution of students across all letter grades.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.

    Returns:
        dict: Mapping of grade (A+, A, B, C, D, E, F) to student count.
    """
    standard_grades = ["A+", "A", "B", "C", "D", "E", "F"]
    counts = df["Grade"].value_counts().to_dict()
    return {grade: int(counts.get(grade, 0)) for grade in standard_grades}


def get_at_risk_students(df: pd.DataFrame) -> pd.DataFrame:
    """
    Filters and returns students requiring academic or attendance intervention:
    - Students who FAIL
    - Students with Performance_Status == 'AT RISK'
    - Students with Attendance < 75%
    - Students with any subject mark < 50

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame with diagnostic columns.

    Returns:
        pd.DataFrame: Filtered at-risk students sorted by Average ascending.
    """
    has_subject_weakness = (df[SUBJECTS] < SUBJECT_ALERT_THRESHOLD).any(axis=1)

    at_risk_mask = (
        (df["Performance_Status"] == "AT RISK") |
        (df["Result"] == "FAIL") |
        (df["Attendance"] < MIN_ATTENDANCE_PERCENTAGE) |
        has_subject_weakness
    )

    cols = ["Student_ID", "Name", "Department", "Average", "Attendance", "Result", "Performance_Status"]
    if "Risk_Reasons" in df.columns:
        cols.append("Risk_Reasons")
    if "Recommendations" in df.columns:
        cols.append("Recommendations")

    available_cols = [c for c in cols if c in df.columns]
    return df[at_risk_mask].sort_values(by="Average", ascending=True)[available_cols]
