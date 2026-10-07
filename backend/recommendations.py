"""
NEXORA — Recommendations Module
===============================
Rule-based intelligence engine generating diagnostic reasons, risk tiers,
and personalized corrective recommendations for students.
"""

from config import (
    SUBJECTS,
    MIN_PASSING_MARK_PER_SUBJECT,
    MIN_ATTENDANCE_PERCENTAGE,
    SUBJECT_FOCUS_THRESHOLD,
    HIGH_PERFORMANCE_THRESHOLD
)

# Subject-specific remedial suggestions
SUBJECT_ADVICE_MAP = {
    "Python": "Strengthen Python fundamentals and practice programming labs",
    "Artificial_Intelligence": "Improve AI fundamentals and machine learning algorithms",
    "SQL": "Practice SQL queries and database schema concepts",
    "Mathematics": "Focus on Mathematics and analytical problem-solving",
    "Computer_Networks": "Focus on Computer Networks and protocol architecture"
}


def evaluate_student_risk(row):
    """
    Evaluates risk tier, underlying reasons, and recommended action steps.

    Parameters:
        row (pd.Series or dict): Enriched student record.

    Returns:
        tuple: (risk_level: str, reasons: list[str], recommendations: list[str])
    """
    reasons = []
    recommendations = []

    avg = row["Average"]
    att = row["Attendance"]

    # 1. Attendance checks
    if att < 65:
        reasons.append(f"Severe attendance shortage ({att}%)")
        recommendations.append("Immediate faculty attendance meeting required; improve attendance urgently")
    elif att < MIN_ATTENDANCE_PERCENTAGE:
        reasons.append(f"Attendance below requirement ({att}%)")
        recommendations.append("Improve attendance to meet 75% examination threshold")

    # 2. Subject marks check
    failed_subjects = []
    weak_subjects = []

    for subject in SUBJECTS:
        score = row[subject]
        formatted_name = subject.replace("_", " ")
        if score < MIN_PASSING_MARK_PER_SUBJECT:
            failed_subjects.append(f"{formatted_name} ({score})")
            recommendations.append(f"Mandatory remedial support in {formatted_name} (Failed with {score})")
        elif score < SUBJECT_FOCUS_THRESHOLD:
            weak_subjects.append(f"{formatted_name} ({score})")
            advice = SUBJECT_ADVICE_MAP.get(subject, f"Focus on {formatted_name}")
            recommendations.append(advice)

    if failed_subjects:
        reasons.append(f"Failed benchmark in: {', '.join(failed_subjects)}")
    if weak_subjects:
        reasons.append(f"Low scores in: {', '.join(weak_subjects)}")

    # 3. Overall Average Check & High Performance
    if avg < 40:
        reasons.append(f"Critical GPA deficit ({avg}%)")
        recommendations.append("Attend mandatory faculty remedial tutoring sessions")
    elif avg < 50:
        reasons.append(f"Low overall academic average ({avg}%)")
        recommendations.append("Schedule weekly academic mentoring check-ins")
    elif avg >= HIGH_PERFORMANCE_THRESHOLD and att >= 85:
        recommendations.append("Maintain high momentum; consider honors projects and advanced research opportunities")

    # 4. Default if performing smoothly
    if not recommendations:
        recommendations.append("Maintain current performance and engage in collaborative peer mentorship")

    # 5. Determine Overall Risk Level Tier
    if failed_subjects or att < 65 or avg < 40:
        risk_level = "Critical"
    elif weak_subjects or att < MIN_ATTENDANCE_PERCENTAGE or avg < 50:
        risk_level = "High"
    elif avg < 70 or att < 80:
        risk_level = "Moderate"
    else:
        risk_level = "Safe"

    return risk_level, reasons, recommendations


def add_recommendations_to_dataframe(df):
    """
    Appends Risk_Level, Risk_Reasons, and Recommendation columns to the DataFrame.

    Parameters:
        df (pd.DataFrame): Enriched student DataFrame.

    Returns:
        pd.DataFrame: DataFrame with risk and recommendation columns.
    """
    df_out = df.copy()

    risk_levels = []
    risk_reasons_col = []
    recommendations_col = []

    for _, row in df_out.iterrows():
        level, reasons, recs = evaluate_student_risk(row)
        risk_levels.append(level)
        risk_reasons_col.append("; ".join(reasons) if reasons else "On Track")
        recommendations_col.append("; ".join(recs))

    df_out["Risk_Level"] = risk_levels
    df_out["Risk_Reasons"] = risk_reasons_col
    df_out["Recommendation"] = recommendations_col

    return df_out


if __name__ == "__main__":
    from data_loader import load_student_data
    from calculations import process_all_calculations

    print("Testing recommendations.py...")
    raw = load_student_data()
    calculated = process_all_calculations(raw)
    with_recs = add_recommendations_to_dataframe(calculated)
    print(with_recs[["Student_ID", "Name", "Risk_Level", "Risk_Reasons", "Recommendation"]].head())
