"""
NEXORA — Test Suite Module
==========================
Unit tests for data loader, calculation rules, pass/fail conditions,
and analytics aggregation.
"""

import sys
import unittest
from pathlib import Path
import pandas as pd

backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from config import DEFAULT_DATA_PATH, SUBJECTS
from data_loader import load_student_data, get_dataset_info
from calculations import (
    calculate_total,
    calculate_average,
    assign_grade,
    check_result,
    get_performance_status,
    process_all_calculations
)
from recommendations import evaluate_student_risk, add_recommendations_to_dataframe
from analytics import get_class_statistics, get_subject_statistics


class TestNexoraAnalytics(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.df_raw = load_student_data(DEFAULT_DATA_PATH)
        cls.df_processed = process_all_calculations(cls.df_raw)
        cls.df_final = add_recommendations_to_dataframe(cls.df_processed)

    def test_dataset_size(self):
        """Verify the dataset contains 30 students."""
        self.assertEqual(len(self.df_raw), 30)

    def test_grade_boundaries(self):
        """Verify letter grade assignments."""
        self.assertEqual(assign_grade(95.0), "A+")
        self.assertEqual(assign_grade(85.0), "A")
        self.assertEqual(assign_grade(75.0), "B")
        self.assertEqual(assign_grade(65.0), "C")
        self.assertEqual(assign_grade(55.0), "D")
        self.assertEqual(assign_grade(45.0), "E")
        self.assertEqual(assign_grade(35.0), "F")

    def test_pass_fail_conditions(self):
        """Verify passing logic with various edge cases."""
        # Case 1: All passed
        pass_row = {
            "Average": 70.0,
            "Attendance": 80.0,
            "Python": 60, "Artificial_Intelligence": 65, "SQL": 70, "Mathematics": 75, "Computer_Networks": 80
        }
        self.assertEqual(check_result(pass_row), "PASS")

        # Case 2: High marks but attendance < 75% -> FAIL
        low_att_row = {
            "Average": 88.0,
            "Attendance": 68.0,
            "Python": 90, "Artificial_Intelligence": 88, "SQL": 86, "Mathematics": 89, "Computer_Networks": 87
        }
        self.assertEqual(check_result(low_att_row), "FAIL")

        # Case 3: High attendance but one subject < 35 -> FAIL
        one_fail_row = {
            "Average": 60.0,
            "Attendance": 90.0,
            "Python": 80, "Artificial_Intelligence": 32, "SQL": 65, "Mathematics": 60, "Computer_Networks": 63
        }
        self.assertEqual(check_result(one_fail_row), "FAIL")

    def test_performance_status_tiers(self):
        """Verify performance categorization."""
        self.assertEqual(get_performance_status(90.0, 95.0), "EXCELLENT")
        self.assertEqual(get_performance_status(75.0, 85.0), "GOOD")
        self.assertEqual(get_performance_status(55.0, 78.0), "NEEDS IMPROVEMENT")
        self.assertEqual(get_performance_status(45.0, 85.0), "AT RISK")
        self.assertEqual(get_performance_status(85.0, 65.0), "AT RISK")

    def test_class_statistics(self):
        """Verify class statistical computations."""
        stats = get_class_statistics(self.df_final)
        self.assertEqual(stats["total_students"], 30)
        self.assertTrue(0 <= stats["class_average"] <= 100)
        self.assertTrue(0 <= stats["pass_percentage"] <= 100)
        self.assertEqual(stats["pass_count"] + stats["fail_count"], 30)


if __name__ == "__main__":
    unittest.main(verbosity=2)
