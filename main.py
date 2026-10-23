"""
NEXORA — Next-Generation Student Performance Analytics System
=============================================================
Tagline: "Turning Student Data into Meaningful Insights."
Course Project: Python with AI

Main Entry Point:
- Loads and validates students.csv
- Performs vector calculations via NumPy and Pandas (functions.py)
- Displays structured, formatted academic report (Sections A-G)
- Provides interactive student search, full roster viewing, and analytics menu
"""

import sys
from pathlib import Path
from typing import Optional
import pandas as pd

# Safe UTF-8 console output setup for Windows terminal compatibility
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Import core analytics engine
import functions


def display_header() -> None:
    """Prints the official NEXORA banner."""
    print("=" * 72)
    print("                                NEXORA")
    print("         Next-Generation Student Performance Analytics System")
    print('             "Turning Student Data into Meaningful Insights."')
    print("=" * 72)


def display_class_overview(stats: dict) -> None:
    """Section A: Displays class-level summary statistics."""
    print("\n[A] CLASS OVERVIEW")
    print("-" * 72)
    print(f"Total Enrolled Students : {stats['total_students']}")
    print(f"Overall Class Average   : {stats['class_average']:.2f}%")
    print(f"Highest Student Average : {stats['highest_average']:.2f}% ({stats['highest_student']})")
    print(f"Lowest Student Average  : {stats['lowest_average']:.2f}% ({stats['lowest_student']})")
    print(f"Median Student Average  : {stats['median']:.2f}%")
    print(f"Standard Deviation      : {stats['std_dev']:.2f}%")
    print(f"Passing Students Count  : {stats['pass_count']} / {stats['total_students']}")
    print(f"Failing Students Count  : {stats['fail_count']} / {stats['total_students']}")
    print(f"Overall Pass Percentage : {stats['pass_percentage']:.2f}%")
    print(f"Class Average Attendance: {stats['average_attendance']:.2f}%")
    print(f"Attendance Shortage (<75%): {stats['attendance_below_75_count']} students")
    print("-" * 72)


def display_top_performers(df: pd.DataFrame, n: int = 5) -> None:
    """Section B: Displays Top Performers Honor Roll."""
    top_df = functions.get_top_performers(df, n=n)
    print(f"\n[B] TOP {n} PERFORMERS (HONOR ROLL)")
    print("-" * 72)
    print(f"{'Rank':<6} {'Student ID':<14} {'Name':<20} {'Average':<10} {'Grade':<8} {'Result'}")
    print("-" * 72)
    for _, row in top_df.iterrows():
        print(
            f"#{row['Rank']:<5} {row['Student_ID']:<14} {row['Name']:<20} "
            f"{row['Average']:<10.2f} {row['Grade']:<8} {row['Result']}"
        )
    print("-" * 72)


def display_subject_analysis(subj_stats: dict) -> None:
    """Section C: Displays Subject-wise benchmark analysis."""
    print("\n[C] SUBJECT-WISE PERFORMANCE ANALYSIS")
    print("-" * 72)
    print(f"{'Subject':<26} {'Average':<10} {'Highest':<9} {'Lowest':<9} {'Pass %':<10}")
    print("-" * 72)
    for _, item in subj_stats["subjects"].items():
        print(
            f"{item['name']:<26} {item['average']:<10.2f} {item['highest']:<9} "
            f"{item['lowest']:<9} {item['pass_percentage']:<9.1f}%"
        )
    print("-" * 72)
    print(f"Best-Performing Subject: {subj_stats['best_subject_name']} ({subj_stats['best_subject_avg']:.2f}%)")
    print(f"Weakest Subject        : {subj_stats['weakest_subject_name']} ({subj_stats['weakest_subject_avg']:.2f}%)")
    print("-" * 72)


def display_grade_distribution(grade_dist: dict, total: int) -> None:
    """Section D: Displays frequency count and percentage of grades."""
    print("\n[D] GRADE DISTRIBUTION")
    print("-" * 72)
    print(f"{'Grade':<8} {'Band Range':<22} {'Count':<10} {'Percentage':<12}")
    print("-" * 72)
    band_labels = {
        "A+": "90% - 100%",
        "A": "80% - 89.9%",
        "B": "70% - 79.9%",
        "C": "60% - 69.9%",
        "D": "50% - 59.9%",
        "E": "40% - 49.9%",
        "F": "Below 40%"
    }
    for grade, count in grade_dist.items():
        pct = (count / total * 100) if total > 0 else 0.0
        bar = "█" * int(pct // 5)
        print(f"{grade:<8} {band_labels.get(grade, ''):<22} {count:<10} {pct:<6.1f}%  {bar}")
    print("-" * 72)


def display_attendance_summary(df: pd.DataFrame) -> None:
    """Section E: Displays Attendance distribution & regulatory shortage summary."""
    att = df["Attendance"].to_numpy(dtype=float)
    avg_att = float(att.mean())
    above_90 = int((att >= 90).sum())
    between_75_89 = int(((att >= 75) & (att < 90)).sum())
    below_75 = int((att < 75).sum())
    critical_65 = int((att < 65).sum())
    total = len(df)

    print("\n[E] ATTENDANCE SUMMARY")
    print("-" * 72)
    print(f"Cohort Mean Attendance   : {avg_att:.2f}%")
    print(f"Exemplary (>= 90%)       : {above_90} students ({above_90/total*100:.1f}%)")
    print(f"Standard (75% - 89%)     : {between_75_89} students ({between_75_89/total*100:.1f}%)")
    print(f"Attendance Shortage (<75%): {below_75} students ({below_75/total*100:.1f}%) [Ineligible for finals]")
    print(f"Critical Deficit (<65%)  : {critical_65} students ({critical_65/total*100:.1f}%) [Requires immediate notice]")
    print("-" * 72)


def display_students_requiring_attention(df: pd.DataFrame) -> None:
    """Section F: Displays students flagged for academic or attendance intervention."""
    at_risk_df = functions.get_at_risk_students(df)
    print("\n[F] STUDENTS REQUIRING ACADEMIC OR ATTENDANCE ATTENTION")
    print("-" * 92)
    print(f"{'Student ID':<13} {'Name':<18} {'Average':<9} {'Att %':<8} {'Status':<14} {'Primary Reason'}")
    print("-" * 92)
    if at_risk_df.empty:
        print("No students currently require academic or attendance intervention.")
    else:
        for _, row in at_risk_df.iterrows():
            reason = row.get("Risk_Reasons", "Requires Attention")
            # Truncate long reasons gracefully for neat tabular output
            if len(reason) > 36:
                reason = reason[:33] + "..."
            print(
                f"{row['Student_ID']:<13} {row['Name']:<18} {row['Average']:<9.2f} "
                f"{row['Attendance']:<8.1f} {row['Performance_Status']:<14} {reason}"
            )
    print("-" * 92)
    print(f"Total Flagged Students: {len(at_risk_df)} of {len(df)}")
    print("-" * 92)


def display_department_performance(df: pd.DataFrame) -> None:
    """Section G: Displays comparative breakdown by department."""
    dept_df = functions.get_department_statistics(df)
    print("\n[G] DEPARTMENT-WISE PERFORMANCE SUMMARY")
    print("-" * 72)
    print(f"{'Department':<16} {'Students':<10} {'Mean GPA':<12} {'Mean Att':<12} {'Pass Rate'}")
    print("-" * 72)
    for _, row in dept_df.iterrows():
        print(
            f"{row['Department']:<16} {row['Total_Students']:<10} {row['Average_Score']:<12.2f} "
            f"{row['Average_Attendance']:<12.2f} {row['Pass_Percentage']:.1f}%"
        )
    print("-" * 72)


def display_full_report(df: pd.DataFrame) -> None:
    """Executes and displays complete Sections A through G."""
    stats = functions.get_class_statistics(df)
    subj_stats = functions.get_subject_statistics(df)
    grade_dist = functions.get_grade_distribution(df)

    display_class_overview(stats)
    display_top_performers(df, n=5)
    display_subject_analysis(subj_stats)
    display_grade_distribution(grade_dist, len(df))
    display_attendance_summary(df)
    display_students_requiring_attention(df)
    display_department_performance(df)


def search_student_by_id(df: pd.DataFrame) -> None:
    """Section H: Interactive individual student diagnostic lookup."""
    print("\n" + "=" * 72)
    print("                     INDIVIDUAL STUDENT LOOKUP")
    print("=" * 72)
    query = input("Enter Student ID to inspect (e.g. NX-2024-001) or press Enter to cancel: ").strip()
    if not query:
        print("[Notice] Lookup cancelled.")
        return

    # Case-insensitive search
    match = df[df["Student_ID"].str.upper() == query.upper()]
    if match.empty:
        # Also attempt partial name match
        match = df[df["Name"].str.contains(query, case=False, na=False)]

    if match.empty:
        print(f"[Error] No student record found matching '{query}'.")
        return

    student = match.iloc[0]
    print("\n" + "-" * 72)
    print(f"STUDENT 360° DIAGNOSTIC CARD: {student['Name']}")
    print("-" * 72)
    print(f"Student ID     : {student['Student_ID']}")
    print(f"Department     : {student['Department']}")
    print(f"Semester       : {student['Semester']}")
    print(f"Class Rank     : #{student['Rank']} of {len(df)}")
    print(f"Academic Result: {student['Result']}")
    print(f"Cumulative Avg : {student['Average']:.2f}%  (Grade: {student['Grade']})")
    print(f"Total Marks    : {student['Total_Marks']} / {functions.MAX_TOTAL_MARKS}")
    print(f"Attendance     : {student['Attendance']:.1f}%")
    print(f"Status Rating  : {student['Performance_Status']}")
    print("-" * 72)
    print("SUBJECT MARKS BREAKDOWN:")
    for subj in functions.SUBJECTS:
        score = student[subj]
        status_flag = "PASS" if score >= functions.MIN_PASSING_MARK_PER_SUBJECT else "FAIL (<35)"
        print(f"  - {subj.replace('_', ' '):<24}: {score:>3} / 100  [{status_flag}]")
    print("-" * 72)

    reasons, recs = functions.generate_recommendations(student)
    print("DIAGNOSTIC REASONS:")
    for r in reasons:
        print(f"  * {r}")
    print("\nACTIONABLE RECOMMENDATIONS:")
    for rec in recs:
        print(f"  -> {rec}")
    print("-" * 72)


def display_all_students_table(df: pd.DataFrame) -> None:
    """Displays the complete roster table with computed metrics."""
    print("\n" + "=" * 90)
    print("                         COMPLETE STUDENT ROSTER RESULTS")
    print("=" * 90)
    print(f"{'Rank':<5} {'ID':<13} {'Name':<18} {'Dept':<12} {'Total':<6} {'Avg %':<7} {'Grd':<4} {'Att %':<6} {'Result'}")
    print("-" * 90)
    sorted_df = df.sort_values(by="Rank", ascending=True)
    for _, row in sorted_df.iterrows():
        print(
            f"#{row['Rank']:<4} {row['Student_ID']:<13} {row['Name']:<18} {row['Department']:<12} "
            f"{row['Total_Marks']:<6} {row['Average']:<7.2f} {row['Grade']:<4} {row['Attendance']:<6.1f} {row['Result']}"
        )
    print("-" * 90)


def interactive_menu(df: pd.DataFrame) -> None:
    """Interactive navigation console for student inspection and reports."""
    while True:
        print("\n" + "=" * 72)
        print("                         NEXORA EXPLORATION MENU")
        print("=" * 72)
        print("1. Search Individual Student by ID / Name")
        print("2. View Complete Student Roster Table")
        print("3. View Subject-wise Analysis")
        print("4. View Students Requiring Attention & Recommendations")
        print("5. View Department-wise Analytics")
        print("6. Re-display Full Comprehensive Report (Sections A-G)")
        print("7. Exit NEXORA")
        print("=" * 72)

        try:
            choice = input("Select an option (1-7): ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n[Notice] Exiting NEXORA gracefully. Goodbye!")
            break

        if choice == "1":
            search_student_by_id(df)
        elif choice == "2":
            display_all_students_table(df)
        elif choice == "3":
            subj_stats = functions.get_subject_statistics(df)
            display_subject_analysis(subj_stats)
        elif choice == "4":
            display_students_requiring_attention(df)
        elif choice == "5":
            display_department_performance(df)
        elif choice == "6":
            display_full_report(df)
        elif choice == "7" or choice.lower() in ("exit", "quit", "q"):
            print("\n[Thank You] NEXORA session terminated successfully. Have a great day!\n")
            break
        else:
            print("[Warning] Invalid selection. Please enter a number between 1 and 7.")


def main(data_file: Optional[str] = None) -> None:
    """
    Main orchestration entry point:
    1. Loads dataset
    2. Computes student marks, grades, status, rankings
    3. Adds rule-based recommendations
    4. Prints formatted report
    5. Starts interactive menu (if terminal is interactive)
    """
    display_header()

    try:
        raw_df = functions.load_student_data(data_file)
    except Exception as exc:
        print(f"\n[Fatal Error] Unable to initialize dataset: {exc}")
        sys.exit(1)

    # Compute calculations using NumPy and Pandas
    processed_df = functions.calculate_student_metrics(raw_df)
    final_df = functions.add_recommendations_to_dataframe(processed_df)

    # Display Comprehensive Sections A through G
    display_full_report(final_df)

    # If report-only flag is set, stop here
    if "--report-only" in sys.argv:
        return

    # Run interactive menu; handles both interactive console and piped test inputs
    try:
        interactive_menu(final_df)
    except (EOFError, KeyboardInterrupt):
        print("\n[Notice] Input ended. Exiting NEXORA.")


if __name__ == "__main__":
    main()
