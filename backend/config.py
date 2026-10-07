"""
NEXORA — Configuration Module
==============================
Centralized rules and benchmarks for academic analytics calculations.
"""

from pathlib import Path

# Base Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DEFAULT_DATA_PATH = DATA_DIR / "students.csv"

# Academic Subjects
SUBJECTS = [
    "Python",
    "Artificial_Intelligence",
    "SQL",
    "Mathematics",
    "Computer_Networks"
]

# Required CSV Columns
REQUIRED_COLUMNS = [
    "Student_ID",
    "Name",
    "Department",
    "Semester"
] + SUBJECTS + ["Attendance"]

# Score & Evaluation Benchmarks
MAX_MARK_PER_SUBJECT = 100
MIN_PASSING_MARK_PER_SUBJECT = 35
MIN_PASSING_AVERAGE = 40.0
MIN_ATTENDANCE_PERCENTAGE = 75.0

# Grade Thresholds (Evaluated against Average score)
GRADE_RULES = [
    (90, 100, "A+"),
    (80, 89, "A"),
    (70, 79, "B"),
    (60, 69, "C"),
    (50, 59, "D"),
    (40, 49, "E"),
    (0, 39, "F")
]

# Performance Status Criteria
STATUS_EXCELLENT_AVG = 85.0
STATUS_EXCELLENT_ATT = 90.0

STATUS_GOOD_AVG = 70.0
STATUS_GOOD_ATT = 80.0

STATUS_NEEDS_IMPROVEMENT_AVG = 50.0
STATUS_NEEDS_IMPROVEMENT_ATT = 75.0

# Subject Focus Threshold (for remedial recommendations)
SUBJECT_FOCUS_THRESHOLD = 50.0
HIGH_PERFORMANCE_THRESHOLD = 85.0
