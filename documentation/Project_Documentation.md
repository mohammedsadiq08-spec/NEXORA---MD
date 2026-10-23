# NEXORA — Next-Generation Student Performance Analytics System
## Academic Project Documentation

---

### 1. Project Title
**NEXORA — Next-Generation Student Performance Analytics System**  
*Tagline: "Turning Student Data into Meaningful Insights."*

---

### 2. Student & Academic Information
- **Student Name**: `[STUDENT NAME — FILL IN]`
- **Student ID / Roll Number**: `[STUDENT ID / ROLL NO — FILL IN]`
- **Course**: Python with AI
- **Academic Institution**: `[COLLEGE / UNIVERSITY NAME — FILL IN]`
- **Academic Year / Semester**: 2026 / Semester 6
- **Submission Date**: `[SUBMISSION DATE — FILL IN]`

---

### 3. Course Details
- **Course Title**: Python Programming with Artificial Intelligence Foundations
- **Assignment**: Student Performance Analytics and Data Intelligence Project
- **Module Focus**: Python Fundamentals, NumPy Numerical Operations, Pandas DataFrame Processing, Statistical Analysis, and Rule-Based Decision Systems.

---

### 4. Objective
The primary objective of **NEXORA** is to build a robust, explainable, and production-grade academic analytics system in Python that automates the evaluation of student cohorts. Specifically, the system aims to:
1. Ingest raw academic data from CSV files and validate structural schema integrity.
2. Calculate cumulative totals, percentage averages, letter grades, and academic outcomes (PASS/FAIL) using vector arithmetic.
3. Compute comprehensive descriptive statistical metrics (mean, median, standard deviation, percentiles) using **NumPy**.
4. Group, filter, and aggregate multi-dimensional student performance by department and subject using **Pandas**.
5. Identify at-risk students through rule-based diagnostic indicators to suggest early intervention strategies.
6. Deliver a polished terminal command-line interface with interactive exploration menus, as well as preserving a decoupled modern web dashboard.

---

### 5. Problem Statement
Educational institutions often handle large volumes of student assessment records stored in static, disconnected spreadsheets. Academic coordinators and faculty face significant challenges in:
- Manually calculating overall GPAs, rankings, and regulatory pass/fail eligibility.
- Detecting multi-factor academic risk (e.g., students who have high test marks but critical attendance shortages).
- Identifying specific curriculum subjects that cause widespread student failure.
- Formulating personalized, actionable remedial guidance for underperforming students without relying on opaque "black box" machine learning algorithms.

NEXORA resolves this problem by implementing a deterministic, transparent Python data analytics pipeline that produces instant actionable insights from raw marks data.

---

### 6. Technologies Used

| Technology | Purpose in Project |
| :--- | :--- |
| **Python 3.12+** | Core programming language, object-oriented design, modular functions, control flow. |
| **Pandas (v3.0.6)** | Structured data loading from CSV, DataFrame schema validation, group aggregations, tabular filtering. |
| **NumPy (v2.5.3)** | Vectorized numerical computations: array summation, means, medians, standard deviations, array comparisons. |
| **CSV** | Persistent raw tabular data storage format for student marks and attendance records. |
| **Unittest** | Python standard library unit test framework for rigorous test-driven validation. |
| **React 18 & Tailwind CSS** | Standalone decoupled frontend web dashboard interface (located in `frontend/`). |

---

### 7. Dataset Description & Number of Records
The dataset is stored in `students.csv` (and mirrored in `data/students.csv`).
- **Total Student Records**: Exactly **30** unique student profiles.
- **Data Characteristics**: The dataset contains realistic fictional student records across diverse performance tiers (high performers, consistent average performers, subject-specific weaknesses, failing students, high marks with low attendance, and low marks with high attendance).
- **Data Integrity**: Contains **zero calculated fields** in the raw CSV (Total, Average, Grade, Result, Rank, and Risk are all computed dynamically at runtime).

---

### 8. Dataset Columns

The raw CSV file strictly consists of the following 10 columns:

| Column Name | Data Type | Permissible Range | Description |
| :--- | :--- | :--- | :--- |
| `Student_ID` | String | Unique ID (`NX-2024-xxx`) | Institutional unique roll number identifier. |
| `Name` | String | Text | Full legal student name. |
| `Department` | String | Categorical | Engineering branch (`CSE AI/ML`, `CSE`, `IT`, `ECE`). |
| `Semester` | String | Categorical | Academic term (`Semester 4`, `Semester 6`). |
| `Python` | Integer | $0 - 100$ | Marks obtained in Python Programming. |
| `Artificial_Intelligence` | Integer | $0 - 100$ | Marks obtained in Artificial Intelligence. |
| `SQL` | Integer | $0 - 100$ | Marks obtained in Database & SQL Systems. |
| `Mathematics` | Integer | $0 - 100$ | Marks obtained in Applied Mathematics. |
| `Computer_Networks` | Integer | $0 - 100$ | Marks obtained in Computer Networks. |
| `Attendance` | Integer / Float | $0.0 - 100.0$ | Cumulative semester attendance percentage. |

---

### 9. Grading and Academic Pass/Fail Rules

#### Evaluation Benchmarks
- **Subjects Analyzed**: 5 core curriculum courses.
- **Maximum Marks per Subject**: 100 (Maximum Aggregate Total: 500).
- **Minimum Subject Passing Mark**: 35 marks.
- **Minimum Overall Passing Average**: 40.0%.
- **Minimum Regulatory Attendance Cutoff**: 75.0%.

#### Pass/Fail Criteria
A student is awarded a status of **PASS** if and only if **all three conditions** are simultaneously met:
$$\text{Result} = \begin{cases} 
\text{PASS} & \text{if } (\text{Average} \ge 40.0) \land (\forall s \in \text{Subjects}, s \ge 35) \land (\text{Attendance} \ge 75.0\%) \\ 
\text{FAIL} & \text{otherwise} 
\end{cases}$$

*Note: If an individual has a 90% average but has an attendance of 74%, they strictly FAIL under these defined academic evaluation rules.*

#### Letter Grade Scale
- **A+**: $90.0\% - 100.0\%$
- **A**: $80.0\% \le \text{Average} < 90.0\%$
- **B**: $70.0\% \le \text{Average} < 80.0\%$
- **C**: $60.0\% \le \text{Average} < 70.0\%$
- **D**: $50.0\% \le \text{Average} < 60.0\%$
- **E**: $40.0\% \le \text{Average} < 50.0\%$
- **F**: Below $40.0\%$

#### Performance Status Tiers
- **EXCELLENT**: $\text{Average} \ge 85.0 \land \text{Attendance} \ge 90.0\%$
- **GOOD**: $\text{Average} \ge 70.0 \land \text{Attendance} \ge 80.0\%$
- **NEEDS IMPROVEMENT**: $\text{Average} \ge 50.0 \land \text{Attendance} \ge 75.0\%$
- **AT RISK**: $\text{Average} < 50.0 \lor \text{Attendance} < 75.0\%$

---

### 10. Project Structure

```
NEXORA/
│
├── main.py                     # Main application entry point & interactive CLI console
├── functions.py                # Reusable analytics engine, validation, and calculations
├── students.csv                # Primary raw benchmark dataset (30 records)
├── test_nexora.py              # Automated unit test suite (20 unit tests)
├── requirements.txt            # Minimal Python dependencies (pandas, numpy)
├── .gitignore                  # Git exclusion rules for clean version control
├── README.md                   # Comprehensive GitHub project documentation
│
├── documentation/
│   ├── Project_Documentation.md # Detailed academic submission document
│   └── ANALYTICS_GUIDE.md      # Mathematical specifications reference
│
├── screenshots/
│   └── README.md               # Guide for submission viva screenshots
│
├── data/
│   └── students.csv            # Mirrored raw dataset for backward compatibility
│
├── backend/                    # Modular engine source files
│   ├── main.py
│   ├── config.py
│   ├── data_loader.py
│   ├── calculations.py
│   ├── analytics.py
│   ├── recommendations.py
│   └── tests.py
│
└── frontend/                   # Decoupled React + Vite + Tailwind CSS Web Dashboard
    ├── src/
    ├── package.json
    └── vite.config.js
```

---

### 11. Implementation Steps
1. **Architectural Design**: Defined the schema and academic evaluation rules in centralized configuration structures.
2. **Dataset Creation**: Generated 30 distinct student profiles ensuring realistic grade distributions, variance, subject-level failures, and attendance shortages.
3. **Core Functions (`functions.py`)**:
   - `load_student_data()`: Robust file reader using `pd.read_csv()` with automated fallback paths.
   - `validate_student_data()`: Schema verification, duplicate ID detection, and range validation.
   - Vector calculations: `calculate_total()` and `calculate_average()` using NumPy array methods.
   - Categorization: `assign_grade()`, `check_result()`, and `get_performance_status()`.
4. **Statistical Analytics Module**:
   - Implemented mean, median, standard deviation, and quartile aggregations.
   - Computed subject pass percentages and best/weakest subject benchmarks.
   - Grouped department performance via Pandas `.groupby()`.
5. **Rule-Based Recommendation Engine**:
   - Formulated deterministic diagnostic rules identifying root causes for low grades and recommending targeted practice.
6. **Main Presentation CLI (`main.py`)**:
   - Built formatted terminal sections (A through G) and an interactive student exploration menu with 360° lookup.
7. **Verification & Testing (`test_nexora.py`)**:
   - Formulated 20 exhaustive unit tests covering boundary values ($34$ vs $35$, $39.9$ vs $40$, $74.9$ vs $75$).

---

### 12. How Python Fundamentals Are Used
- **Variables & Data Types**: Strings, integers, floats, booleans, lists, dictionaries, tuples, and custom type hints.
- **Control Flow & Conditionals**: `if-elif-else` branching for grade boundary mapping, multi-condition pass/fail checks, and menu selections.
- **Loops & Comprehensions**:
  - `for` loops iterating over subject lists for mark validation.
  - List comprehensions formatting diagnostic reasons and subject strings.
- **Reusable Functions**: 16 dedicated functions with explicit parameters, type hints, docstrings, and modular design.
- **Exception Handling**: `try-except` blocks catching `FileNotFoundError`, `ValueError`, `KeyError`, and handling terminal `KeyboardInterrupt`/`EOFError` gracefully.

---

### 13. How NumPy Is Used
NumPy is used for fast vector operations without relying on slow manual Python loops:
- `np.sum(axis=1)`: Row-wise aggregate total marks calculation.
- `np.mean(axis=1)`: Row-wise student percentage average calculation.
- `np.mean(array)`: Cohort class average and subject average calculations.
- `np.median(array)`: Identifying the 50th percentile student performance.
- `np.std(array)`: Calculating population standard deviation ($\sigma$) to measure academic variance.
- `np.max(array)` & `np.min(array)`: Discovering highest and lowest scores across subjects.
- `np.testing.assert_array_equal()`: Vectorized validation in unit test assertions.

---

### 14. How Pandas Is Used
Pandas provides high-level tabular data structures and data manipulation:
- `pd.read_csv()`: Ingesting dataset into structured 2D `DataFrame`.
- `df.isna().sum()` & `df.duplicated()`: Inspecting missing values and duplicate records.
- `df[column].apply()`: Vectorized application of grading logic.
- `df.apply(check_result, axis=1)`: Row-level multi-column evaluation.
- `df.groupby("Department").agg()`: Grouped statistical rollups for academic department performance.
- `df.sort_values(by="Average", ascending=False)`: Class rank sorting and Top 5 selection.
- `df[condition]`: Boolean indexing to filter at-risk cohorts.

---

### 15. Features and Functionality
1. **Automated Schema & Value Validation**: Prevents silent corruption from negative marks, NaN values, or duplicates.
2. **Executive Class Overview (Section A)**: Computes overall mean, median, std dev, and pass percentage.
3. **Honor Roll Top 5 Performers (Section B)**: Highlights top performers with consistent tie-breaking.
4. **Subject Benchmarking (Section C)**: Calculates highest/lowest/average per subject and identifies the best and weakest courses.
5. **Grade Distribution (Section D)**: Visualizes frequency counts and text-based histogram bars.
6. **Regulatory Attendance Monitor (Section E)**: Flags students under the 75% examination threshold and under 65% critical deficit.
7. **Intervention Radar (Section F)**: Highlights at-risk students with specific diagnostic reasons.
8. **Department-Wise Summary (Section G)**: Compares pass percentages across engineering disciplines.
9. **Interactive 360° Search (Section H)**: Allows faculty to query any student ID to view a complete diagnostic report card and recommendations.

---

### 16. Sample Output Generated from the Actual Program

```
========================================================================
                                NEXORA
         Next-Generation Student Performance Analytics System
             "Turning Student Data into Meaningful Insights."
========================================================================

[A] CLASS OVERVIEW
------------------------------------------------------------------------
Total Enrolled Students : 30
Overall Class Average   : 71.12%
Highest Student Average : 92.60% (Aarav Sharma (NX-2024-001))
Lowest Student Average  : 43.40% (Karanvir Singh (NX-2024-024))
Median Student Average  : 74.40%
Standard Deviation      : 15.25%
Passing Students Count  : 20 / 30
Failing Students Count  : 10 / 30
Overall Pass Percentage : 66.67%
Class Average Attendance: 80.70%
Attendance Shortage (<75%): 10 students
------------------------------------------------------------------------

[B] TOP 5 PERFORMERS (HONOR ROLL)
------------------------------------------------------------------------
Rank   Student ID     Name                 Average    Grade    Result
------------------------------------------------------------------------
#1     NX-2024-001    Aarav Sharma         92.60      A+       PASS
#2     NX-2024-002    Priya Patel          91.00      A+       PASS
#3     NX-2024-003    Rohan Varma          90.00      A+       PASS
#4     NX-2024-026    Yash Singhania       88.00      A        FAIL
#5     NX-2024-028    Aryan Choudhury      87.60      A        PASS
------------------------------------------------------------------------

[C] SUBJECT-WISE PERFORMANCE ANALYSIS
------------------------------------------------------------------------
Subject                    Average    Highest   Lowest    Pass %    
------------------------------------------------------------------------
Python                     73.20      96        47        100.0    %
Artificial Intelligence    69.03      97        32        96.7     %
SQL                        73.53      96        49        100.0    %
Mathematics                69.90      95        38        100.0    %
Computer Networks          69.93      94        30        96.7     %
------------------------------------------------------------------------
Best-Performing Subject: SQL (73.53%)
Weakest Subject        : Artificial Intelligence (69.03%)
------------------------------------------------------------------------

[D] GRADE DISTRIBUTION
------------------------------------------------------------------------
Grade    Band Range             Count      Percentage  
------------------------------------------------------------------------
A+       90% - 100%             3          10.0  %  ██
A        80% - 89.9%            9          30.0  %  ██████
B        70% - 79.9%            4          13.3  %  ██
C        60% - 69.9%            6          20.0  %  ████
D        50% - 59.9%            4          13.3  %  ██
E        40% - 49.9%            4          13.3  %  ██
F        Below 40%              0          0.0   %  
------------------------------------------------------------------------

[E] ATTENDANCE SUMMARY
------------------------------------------------------------------------
Cohort Mean Attendance   : 80.70%
Exemplary (>= 90%)       : 8 students (26.7%)
Standard (75% - 89%)     : 12 students (40.0%)
Attendance Shortage (<75%): 10 students (33.3%) [Ineligible for finals]
Critical Deficit (<65%)  : 2 students (6.7%) [Requires immediate notice]
------------------------------------------------------------------------

[F] STUDENTS REQUIRING ACADEMIC OR ATTENDANCE ATTENTION
--------------------------------------------------------------------------------------------
Student ID    Name               Average   Att %    Status         Primary Reason
--------------------------------------------------------------------------------------------
NX-2024-024   Karanvir Singh     43.40     61.0     AT RISK        Severe attendance shortage (61.0%...
NX-2024-023   Devendra Patil     45.40     64.0     AT RISK        Severe attendance shortage (64.0%...
NX-2024-027   Aniket Joshi       46.40     92.0     AT RISK        Low score in Python (48/100); Low...
NX-2024-022   Sneha Nair         47.80     66.0     AT RISK        Attendance below 75% threshold (6...
NX-2024-021   Rahul Verma        51.60     68.0     AT RISK        Attendance below 75% threshold (6...
NX-2024-025   Deepak Mishra      53.00     69.0     AT RISK        Attendance below 75% threshold (6...
NX-2024-019   Pooja Hegde        56.80     71.0     AT RISK        Attendance below 75% threshold (7...
NX-2024-020   Manoj Kumar        57.20     70.0     AT RISK        Attendance below 75% threshold (7...
NX-2024-018   Ishaan Mehta       61.80     73.0     AT RISK        Attendance below 75% threshold (7...
NX-2024-017   Varun Gupta        63.00     74.0     AT RISK        Attendance below 75% threshold (7...
NX-2024-013   Arjun Sen          65.40     81.0     NEEDS IMPROVEMENT Low score in Computer Networks (4...
NX-2024-026   Yash Singhania     88.00     68.0     AT RISK        Attendance below 75% threshold (6...
--------------------------------------------------------------------------------------------
Total Flagged Students: 12 of 30
--------------------------------------------------------------------------------------------

[G] DEPARTMENT-WISE PERFORMANCE SUMMARY
------------------------------------------------------------------------
Department       Students   Mean GPA     Mean Att     Pass Rate
------------------------------------------------------------------------
CSE AI/ML        7          76.09        80.00        57.1%
CSE              8          73.20        82.00        62.5%
ECE              7          69.57        80.29        71.4%
IT               8          66.05        80.38        75.0%
------------------------------------------------------------------------
```

---

### 17. Screenshots Section
*(Place your captured application screenshots into the `screenshots/` directory before printing/submitting).*

1. **Terminal Analytics Overview (`screenshots/01_cli_full_report.png`)**: Sections A through G execution.
2. **Interactive 360° Student Search (`screenshots/02_cli_student_search.png`)**: Diagnostic card for `NX-2024-001`.
3. **Ranked Complete Roster (`screenshots/03_cli_roster_table.png`)**: 30-student ranked results table.
4. **Unit Test Execution (`screenshots/04_unit_tests.png`)**: All 20 unit tests executing with `OK`.
5. **Web Analytics Interface (`screenshots/05_frontend_dashboard.png`)**: Modern web UI running on Vite.

---

### 18. Testing Performed and Actual Results
All 20 automated unit tests were executed locally using the Python `unittest` framework:
- **Test Command**: `python test_nexora.py`
- **Execution Time**: $0.151$ seconds
- **Pass Rate**: $20 / 20$ Passed ($100\%$)

| Test Case | Description | Tested Boundary | Result |
| :--- | :--- | :--- | :--- |
| `test_01` | Record count verification | Dataset length == 30 | **PASS** |
| `test_02` | Unique ID verification | No duplicate `Student_ID` | **PASS** |
| `test_03` | Schema completeness | All 10 required columns present | **PASS** |
| `test_04` | Value range checks | Marks & Attendance in $[0, 100]$ | **PASS** |
| `test_05` | Vectorized Total | Sum matches manual additions | **PASS** |
| `test_06` | Vectorized Average | Mean matches NumPy computation | **PASS** |
| `test_07` | Grade boundaries | $40, 50, 60, 70, 80, 90$ exact mapping | **PASS** |
| `test_08` | Borderline pass | Exactly $40\%$ avg, $35$ in all subjects, $75\%$ att | **PASS** |
| `test_09` | Low attendance rule | Attendance $74.9\%$ fails even with $88\%$ GPA | **PASS** |
| `test_10` | Single subject failure | Mark of $34$ fails even with $70\%$ GPA | **PASS** |
| `test_11` | Borderline average failure | Average of $39.9\%$ fails | **PASS** |
| `test_12` | Status categorization | EXCELLENT, GOOD, NEEDS IMP, AT RISK | **PASS** |
| `test_13` | Class statistics | Mathematical relations & counts | **PASS** |
| `test_14` | Top 5 sorting | Descending average sort order | **PASS** |
| `test_15` | Subject analysis | High, low, average, pass percentage | **PASS** |
| `test_16` | Missing file error | `FileNotFoundError` raised on bad path | **PASS** |
| `test_17` | Missing column validation | Rejects corrupted CSV schemas | **PASS** |
| `test_18` | Duplicate ID validation | Identifies duplicate entries | **PASS** |
| `test_19` | Missing value validation | Rejects NaN values (does not silence) | **PASS** |
| `test_20` | Out of bounds validation | Catches marks $> 100$ or $< 0$ | **PASS** |

---

### 19. Challenges and Learning Outcomes
1. **Handling Edge Cases in Multi-Criteria Rules**:
   - *Challenge*: Balancing pass/fail outcomes where a student possesses exemplary academic marks (e.g. 88%) but violates attendance thresholds (68%).
   - *Solution*: Formulated strict conditional checking where attendance and subject-level minimums act as prerequisites before awarding passing status.
2. **Vectorization vs Loop Tradeoffs**:
   - *Challenge*: Avoiding slow Python iterative row loops for large datasets while maintaining clean, readable code for viva evaluation.
   - *Solution*: Leveraged NumPy array summation and mean operations across matrix axes (`axis=1`), reducing runtime to milliseconds.
3. **Consistent Class Ranking**:
   - *Challenge*: Addressing score ties cleanly without skipping numbers inappropriately.
   - *Solution*: Utilized Pandas `.rank(ascending=False, method="min")` so tied students share their earned rank consistently.

---

### 20. Limitations
- The system operates strictly as a batch-processing engine over static CSV files; it does not connect to live campus SQL databases.
- Recommendations are rule-based expert heuristics rather than personalized predictive models.
- The web frontend currently operates in standalone demo mode with client-side reactive state rather than being bound to a live Python REST API.

---

### 21. Future Improvements
1. **REST API Service**: Build a lightweight FastAPI server that exposes Python Pandas calculations as JSON endpoints directly to the React frontend.
2. **Automated Notification Dispatch**: Integrate SMTP/Twilio services to automatically email low-attendance alerts to students and guardians.
3. **Database Integration**: Connect PostgreSQL or SQLite storage for persistent historical semester comparisons over multiple academic years.

---

### 22. Submission Links & Placeholders
- **GitHub Repository**: `https://github.com/[YOUR-USERNAME]/NEXORA`
- **Google Form Submission Link**: `[GOOGLE FORM URL — FILL IN]`
- **Video Demonstration Link**: `[UNLISTED YOUTUBE / DRIVE URL — FILL IN]`
