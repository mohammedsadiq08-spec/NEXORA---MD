"""
NEXORA — Comprehensive Test Suite
==================================
File: test_nexora.py
Tests dataset loading, total/average calculations, boundary conditions,
pass/fail rules, attendance thresholds, subject benchmarks, rankings,
and error handling.
"""

import unittest
from pathlib import Path
import numpy as np
import pandas as pd

import functions


class TestNexoraSystem(unittest.TestCase):
    """Unit tests for the NEXORA Analytics Engine."""

    @classmethod
    def setUpClass(cls):
        """Loads and processes the authentic students.csv dataset."""
        cls.raw_df = functions.load_student_data()
        cls.processed_df = functions.calculate_student_metrics(cls.raw_df)
        cls.enriched_df = functions.add_recommendations_to_dataframe(cls.processed_df)

    # --------------------------------------------------------------------------
    # 1. Dataset Integrity & Schema Tests
    # --------------------------------------------------------------------------
    def test_01_dataset_record_count(self):
        """Verify the dataset contains at least 30 students."""
        self.assertGreaterEqual(len(self.raw_df), 30)
        self.assertEqual(len(self.raw_df), 30)

    def test_02_dataset_unique_ids(self):
        """Verify all Student_ID values are strictly unique."""
        ids = self.raw_df["Student_ID"]
        self.assertEqual(len(ids), len(ids.unique()), "Duplicate Student_ID found in dataset!")

    def test_03_required_columns_exist(self):
        """Verify all required raw columns exist in the dataset."""
        for col in functions.REQUIRED_COLUMNS:
            self.assertIn(col, self.raw_df.columns)

    def test_04_mark_and_attendance_ranges(self):
        """Verify marks and attendance are within [0, 100]."""
        for subject in functions.SUBJECTS:
            self.assertTrue((self.raw_df[subject] >= 0).all() and (self.raw_df[subject] <= 100).all())
        self.assertTrue((self.raw_df["Attendance"] >= 0).all() and (self.raw_df["Attendance"] <= 100).all())

    # --------------------------------------------------------------------------
    # 2. Mathematical Calculations (Total & Average)
    # --------------------------------------------------------------------------
    def test_05_total_marks_calculation(self):
        """Verify Total_Marks matches the sum of all 5 subjects."""
        manual_totals = self.raw_df[functions.SUBJECTS].sum(axis=1)
        computed_totals = self.processed_df["Total_Marks"]
        np.testing.assert_array_equal(manual_totals.to_numpy(), computed_totals.to_numpy())

    def test_06_average_marks_calculation(self):
        """Verify Average matches mean of 5 subjects rounded to 2 decimals."""
        manual_avgs = np.round(self.raw_df[functions.SUBJECTS].mean(axis=1).to_numpy(), 2)
        computed_avgs = self.processed_df["Average"].to_numpy()
        np.testing.assert_array_almost_equal(manual_avgs, computed_avgs, decimal=2)

    # --------------------------------------------------------------------------
    # 3. Grade Boundary Tests
    # --------------------------------------------------------------------------
    def test_07_grade_boundary_exact_values(self):
        """Verify strict grade boundaries at 40, 50, 60, 70, 80, 90."""
        # A+ (90 to 100)
        self.assertEqual(functions.assign_grade(100.0), "A+")
        self.assertEqual(functions.assign_grade(90.0), "A+")

        # A (80 to below 90)
        self.assertEqual(functions.assign_grade(89.99), "A")
        self.assertEqual(functions.assign_grade(80.0), "A")

        # B (70 to below 80)
        self.assertEqual(functions.assign_grade(79.99), "B")
        self.assertEqual(functions.assign_grade(70.0), "B")

        # C (60 to below 70)
        self.assertEqual(functions.assign_grade(69.99), "C")
        self.assertEqual(functions.assign_grade(60.0), "C")

        # D (50 to below 60)
        self.assertEqual(functions.assign_grade(59.99), "D")
        self.assertEqual(functions.assign_grade(50.0), "D")

        # E (40 to below 50)
        self.assertEqual(functions.assign_grade(49.99), "E")
        self.assertEqual(functions.assign_grade(40.0), "E")

        # F (Below 40)
        self.assertEqual(functions.assign_grade(39.99), "F")
        self.assertEqual(functions.assign_grade(0.0), "F")

    # --------------------------------------------------------------------------
    # 4. Pass / Fail Evaluation Boundary Tests
    # --------------------------------------------------------------------------
    def test_08_pass_boundary_all_three_criteria_satisfied(self):
        """A student with exact minimum boundaries (Avg=40, all subjects=35, Att=75) must PASS."""
        border_pass = {
            "Average": 40.0,
            "Attendance": 75.0,
            "Python": 35,
            "Artificial_Intelligence": 35,
            "SQL": 35,
            "Mathematics": 45,
            "Computer_Networks": 50
        }
        self.assertEqual(functions.check_result(border_pass), "PASS")

    def test_09_pass_boundary_attendance_74_fails(self):
        """Attendance of 74% (<75) must FAIL even if average is high (e.g. 88%)."""
        att_74_fail = {
            "Average": 88.0,
            "Attendance": 74.9,
            "Python": 90, "Artificial_Intelligence": 85, "SQL": 88, "Mathematics": 90, "Computer_Networks": 87
        }
        self.assertEqual(functions.check_result(att_74_fail), "FAIL")

        att_75_pass = dict(att_74_fail, Attendance=75.0)
        self.assertEqual(functions.check_result(att_75_pass), "PASS")

    def test_10_pass_boundary_subject_mark_34_fails(self):
        """One subject mark of 34 (<35) must FAIL even with high average and attendance."""
        sub_34_fail = {
            "Average": 70.0,
            "Attendance": 90.0,
            "Python": 80,
            "Artificial_Intelligence": 34,  # Failing mark (<35)
            "SQL": 80,
            "Mathematics": 80,
            "Computer_Networks": 76
        }
        self.assertEqual(functions.check_result(sub_34_fail), "FAIL")

        sub_35_pass = dict(sub_34_fail, Artificial_Intelligence=35)
        self.assertEqual(functions.check_result(sub_35_pass), "PASS")

    def test_11_pass_boundary_average_39_9_fails(self):
        """An average below 40 must FAIL even if all subjects are >= 35 and attendance is high."""
        avg_fail = {
            "Average": 39.9,
            "Attendance": 90.0,
            "Python": 40, "Artificial_Intelligence": 40, "SQL": 40, "Mathematics": 40, "Computer_Networks": 39
        }
        self.assertEqual(functions.check_result(avg_fail), "FAIL")

    # --------------------------------------------------------------------------
    # 5. Performance Status Category Tests
    # --------------------------------------------------------------------------
    def test_12_performance_status_tiers(self):
        """Verify performance status rules."""
        # EXCELLENT: Avg >= 85 and Att >= 90
        self.assertEqual(functions.get_performance_status(85.0, 90.0), "EXCELLENT")
        self.assertEqual(functions.get_performance_status(95.0, 96.0), "EXCELLENT")

        # GOOD: Avg >= 70 and Att >= 80
        self.assertEqual(functions.get_performance_status(70.0, 80.0), "GOOD")
        self.assertEqual(functions.get_performance_status(80.0, 85.0), "GOOD")

        # NEEDS IMPROVEMENT: Avg >= 50 and Att >= 75
        self.assertEqual(functions.get_performance_status(50.0, 75.0), "NEEDS IMPROVEMENT")

        # AT RISK: Avg < 50 OR Att < 75
        self.assertEqual(functions.get_performance_status(49.9, 90.0), "AT RISK")
        self.assertEqual(functions.get_performance_status(85.0, 74.9), "AT RISK")

    # --------------------------------------------------------------------------
    # 6. Analytics & Aggregations
    # --------------------------------------------------------------------------
    def test_13_class_statistics(self):
        """Verify class statistics dictionary fields and mathematical relations."""
        stats = functions.get_class_statistics(self.enriched_df)
        self.assertEqual(stats["total_students"], 30)
        self.assertAlmostEqual(stats["class_average"], float(self.enriched_df["Average"].mean()), places=2)
        self.assertEqual(stats["pass_count"] + stats["fail_count"], 30)
        self.assertAlmostEqual(stats["pass_percentage"], (stats["pass_count"] / 30) * 100, places=2)
        self.assertAlmostEqual(stats["median"], float(np.median(self.enriched_df["Average"])), places=2)
        self.assertAlmostEqual(stats["std_dev"], float(np.std(self.enriched_df["Average"])), places=2)

    def test_14_top_five_ranking(self):
        """Verify top 5 performers ranking order and structure."""
        top5 = functions.get_top_performers(self.enriched_df, n=5)
        self.assertEqual(len(top5), 5)
        # Verify descending order of average
        avgs = top5["Average"].tolist()
        self.assertEqual(avgs, sorted(avgs, reverse=True))
        # Top performer in our dataset is Aarav Sharma
        self.assertEqual(top5.iloc[0]["Student_ID"], "NX-2024-001")

    def test_15_subject_statistics(self):
        """Verify subject statistics computations."""
        subj_stats = functions.get_subject_statistics(self.enriched_df)
        self.assertEqual(len(subj_stats["subjects"]), 5)
        for subj in functions.SUBJECTS:
            self.assertIn(subj, subj_stats["subjects"])
            self.assertGreaterEqual(subj_stats["subjects"][subj]["highest"], subj_stats["subjects"][subj]["lowest"])
        # Check that best and weakest subject are identified
        self.assertIn(subj_stats["best_subject"], functions.SUBJECTS)
        self.assertIn(subj_stats["weakest_subject"], functions.SUBJECTS)

    # --------------------------------------------------------------------------
    # 7. Error & Invalid Data Handling
    # --------------------------------------------------------------------------
    def test_16_missing_file_handling(self):
        """Verify FileNotFoundError on non-existent file."""
        with self.assertRaises(FileNotFoundError):
            functions.load_student_data("non_existent_file_path_12345.csv")

    def test_17_missing_columns_validation(self):
        """Verify validation catches missing columns without silent crash."""
        bad_df = pd.DataFrame({
            "Student_ID": ["NX-001"],
            "Name": ["Test Student"]
            # Missing Department, Semester, Subjects, Attendance
        })
        is_valid, errors = functions.validate_student_data(bad_df)
        self.assertFalse(is_valid)
        self.assertTrue(any("Missing required columns" in e for e in errors))

    def test_18_duplicate_id_validation(self):
        """Verify validation catches duplicate Student IDs."""
        dup_df = self.raw_df.copy()
        dup_df.loc[1, "Student_ID"] = dup_df.loc[0, "Student_ID"]  # Force duplicate
        is_valid, errors = functions.validate_student_data(dup_df)
        self.assertFalse(is_valid)
        self.assertTrue(any("Duplicate Student_ID" in e for e in errors))

    def test_19_missing_nan_values_validation(self):
        """Verify validation rejects missing (NaN) values and does NOT silently treat as 0."""
        nan_df = self.raw_df.copy()
        nan_df.loc[0, "Python"] = np.nan
        is_valid, errors = functions.validate_student_data(nan_df)
        self.assertFalse(is_valid)
        self.assertTrue(any("Missing (NaN) values detected" in e for e in errors))

    def test_20_out_of_bounds_marks_validation(self):
        """Verify validation catches marks outside 0-100 range."""
        oob_df = self.raw_df.copy()
        oob_df.loc[0, "Mathematics"] = 105
        is_valid, errors = functions.validate_student_data(oob_df)
        self.assertFalse(is_valid)
        self.assertTrue(any("outside 0-100" in e for e in errors))


if __name__ == "__main__":
    unittest.main(verbosity=2)
