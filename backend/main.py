"""
NEXORA — Next-Generation Student Performance Analytics System
=============================================================
Main entry point for Python, NumPy, and Pandas analytics pipeline.
"""

import sys
from pathlib import Path

# Ensure UTF-8 output encoding for cross-platform terminal compatibility
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add backend directory to module path
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from config import DEFAULT_DATA_PATH
from data_loader import load_student_data, get_dataset_info
from calculations import process_all_calculations
from recommendations import add_recommendations_to_dataframe
from analytics import (
    get_class_statistics,
    get_subject_statistics,
    get_top_performers,
    get_lowest_performers,
    get_department_statistics,
    get_grade_distribution,
    get_attendance_analysis,
    get_students_requiring_attention
)


def run_pipeline(data_path=DEFAULT_DATA_PATH):
    """
    Executes the complete NEXORA academic data intelligence pipeline:
    Load -> Calculate -> Diagnose & Recommend -> Aggregate Analytics -> Print Summary
    """
    # 1. Load Dataset
    raw_df = load_student_data(data_path)

    # 2. Process Academic Calculations
    calculated_df = process_all_calculations(raw_df)

    # 3. Add Rule-Based Diagnostic Recommendations
    final_df = add_recommendations_to_dataframe(calculated_df)

    # 4. Generate Core Analytics
    class_stats = get_class_statistics(final_df)
    subject_stats = get_subject_statistics(final_df)
    top_performers = get_top_performers(final_df, n=5)
    attention_students = get_students_requiring_attention(final_df)
    dept_stats = get_department_statistics(final_df)
    grade_dist = get_grade_distribution(final_df)
    att_analysis = get_attendance_analysis(final_df)

    top_performer_name = top_performers.iloc[0]["Name"] if not top_performers.empty else "N/A"
    top_performer_avg = top_performers.iloc[0]["Average"] if not top_performers.empty else 0.0

    # 5. Output Clean Terminal Dashboard
    print("\n" + "=" * 44)
    print("                NEXORA")
    print("  Student Performance Analytics System")
    print("=" * 44)
    print(f"Total Students       : {class_stats['total_students']}")
    print(f"Class Average        : {class_stats['class_average']:.2f}%")
    print(f"Pass Percentage      : {class_stats['pass_percentage']:.2f}% ({class_stats['pass_count']}/{class_stats['total_students']} Passed)")
    print(f"Average Attendance   : {class_stats['average_attendance']:.2f}%")
    print(f"Top Performer        : {top_performer_name} ({top_performer_avg:.2f}%)")
    print(f"Best Subject         : {subject_stats['best_subject_name']} ({subject_stats['best_subject_avg']:.2f}%)")
    print(f"At-Risk Students     : {len(attention_students)}")
    print("=" * 44 + "\n")

    # Detailed Academic Sections
    print("[1] SUBJECT PERFORMANCE BENCHMARKS")
    print("-" * 68)
    print(f"{'Subject':<26} {'Average':<10} {'Highest':<10} {'Lowest':<10} {'Pass %':<10}")
    print("-" * 68)
    for subj_key, metrics in subject_stats["subjects"].items():
        print(f"{metrics['name']:<26} {metrics['average']:<10.2f} {metrics['highest']:<10} {metrics['lowest']:<10} {metrics['pass_percentage']:<10.1f}%")
    print("-" * 68)

    print("\n[2] TOP 5 PERFORMERS (HONOR ROLL)")
    print("-" * 68)
    print(f"{'Rank':<6} {'Roll No':<14} {'Name':<20} {'Average':<10} {'Grade':<8} {'Result'}")
    print("-" * 68)
    for idx, (_, row) in enumerate(top_performers.iterrows(), 1):
        print(f"#{idx:<5} {row['Student_ID']:<14} {row['Name']:<20} {row['Average']:<10.2f} {row['Grade']:<8} {row['Result']}")
    print("-" * 68)

    print("\n[3] STUDENTS REQUIRING ATTENTION & INTERVENTION")
    print("-" * 90)
    print(f"{'Roll No':<14} {'Name':<18} {'Avg %':<8} {'Att %':<8} {'Risk':<10} {'Primary Concern'}")
    print("-" * 90)
    for _, row in attention_students.iterrows():
        print(f"{row['Student_ID']:<14} {row['Name']:<18} {row['Average']:<8.2f} {row['Attendance']:<8.1f} {row['Risk_Level']:<10} {row['Risk_Reasons']}")
    print("-" * 90)

    print("\n[4] DEPARTMENT PERFORMANCE SUMMARY")
    print("-" * 68)
    print(f"{'Department':<16} {'Students':<10} {'Mean GPA':<12} {'Mean Att':<12} {'Pass Rate'}")
    print("-" * 68)
    for _, row in dept_stats.iterrows():
        print(f"{row['Department']:<16} {row['Total_Students']:<10} {row['Average_Score']:<12.2f} {row['Average_Attendance']:<12.2f} {row['Pass_Percentage']:.1f}%")
    print("-" * 68)

    print("\n[5] GRADE DISTRIBUTION")
    print("  " + "  |  ".join([f"Grade {g}: {count}" for g, count in grade_dist.items()]))
    print("=" * 68 + "\n")

    return {
        "final_df": final_df,
        "class_stats": class_stats,
        "subject_stats": subject_stats,
        "top_performers": top_performers,
        "attention_students": attention_students,
        "dept_stats": dept_stats,
        "grade_dist": grade_dist,
        "att_analysis": att_analysis
    }


if __name__ == "__main__":
    run_pipeline()
