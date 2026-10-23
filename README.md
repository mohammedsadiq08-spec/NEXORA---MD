# NEXORA — Next-Generation Student Performance Analytics System

> **“Turning Student Data into Meaningful Insights.”**

**NEXORA** is a student performance analytics platform developed for the **Python with AI** course. It processes raw academic marks, attendance records, and subject scores to deliver comprehensive statistical metrics, performance diagnostics, and rule-based intervention recommendations.

---

## 🌟 Key Features

- **Python Core Fundamentals**: Built with clean, beginner-friendly functions, explicit conditional logic, and robust error handling.
- **NumPy Numerical Vectorization**: Computes means (`np.mean`), medians (`np.median`), standard deviations (`np.std`), maximums, and minimums across numerical mark arrays.
- **Pandas Tabular Operations**: Loads and validates CSV schemas, handles aggregations, and computes multi-tiered department statistics.
- **Multi-Factor Pass/Fail Evaluation**: Enforces realistic academic criteria: overall average $\ge 40\%$, every subject $\ge 35$, and attendance $\ge 75\%$.
- **Rule-Based Diagnostic Guidance**: Identifies subject-specific deficiencies and flags at-risk students for early faculty intervention.
- **Interactive Terminal Console**: Features executive summary sections (A to G), individual student 360° lookup, and complete roster exploration.
- **Preserved Decoupled Frontend**: High-performance React + Vite + Tailwind CSS dashboard located in `frontend/`.

---

## 📁 Project Structure

```
NEXORA/
│
├── main.py                     # Main application entry point & interactive CLI console
├── functions.py                # Reusable analytics engine, validation, and calculations
├── students.csv                # Primary raw benchmark dataset (30 records)
├── test_nexora.py              # Automated unit test suite (20 unit tests)
├── requirements.txt            # Minimal Python dependencies (pandas, numpy)
├── .gitignore                  # Git exclusion rules for clean version control
├── README.md                   # This project guide
│
├── documentation/
│   ├── Project_Documentation.md # Comprehensive 22-section academic documentation
│   └── ANALYTICS_GUIDE.md      # Mathematical specifications reference
│
├── screenshots/
│   └── README.md               # Visual screenshots placeholder and guide
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

## 🚀 Getting Started (Windows Setup Guide)

### 1. Open Project in VS Code
Open your terminal and navigate to the project directory:
```powershell
cd c:\NEXORA
```

### 2. Create and Activate a Python Virtual Environment
```powershell
# Create virtual environment
python -m venv venv

# Activate virtual environment on Windows PowerShell
.\venv\Scripts\Activate.ps1

# (If using Command Prompt cmd.exe instead):
# venv\Scripts\activate.bat
```

### 3. Install Python Dependencies
```powershell
pip install -r requirements.txt
```
*Dependencies installed:*
- `pandas>=2.0.0`
- `numpy>=1.24.0`

### 4. Run the Python Analytics System
```powershell
python main.py
```

---

## 📊 Where the Dataset is Located & How to Modify It

The raw dataset is stored in:
- **`students.csv`** (project root)
- **`data/students.csv`** (mirrored for safety)

### Required Columns:
`Student_ID`, `Name`, `Department`, `Semester`, `Python`, `Artificial_Intelligence`, `SQL`, `Mathematics`, `Computer_Networks`, `Attendance`

### Rules for Modifying the Dataset:
1. **Do NOT add calculated columns** like `Total`, `Average`, `Grade`, or `Result` to the raw CSV. These are calculated dynamically by Python at runtime.
2. Ensure each `Student_ID` is unique (e.g., `NX-2024-031`).
3. Subject marks must be integers or floats between `0` and `100`.
4. Attendance percentages must be between `0` and `100`.
5. Supported departments: `CSE AI/ML`, `CSE`, `IT`, `ECE`.

---

## 🧪 Running the Automated Test Suite

To verify all calculations, boundary conditions, and schema validations:
```powershell
python test_nexora.py
```
*Result:* Executes 20 automated unit tests verifying:
- Dataset loading and uniqueness of Student IDs
- Exact total marks and average calculations
- Exact grade boundaries ($40, 50, 60, 70, 80, 90$)
- Strict pass/fail boundary edge cases:
  - Subject mark: $34$ (FAIL) vs $35$ (PASS)
  - Attendance: $74.9\%$ (FAIL) vs $75.0\%$ (PASS)
  - Average: $39.9\%$ (FAIL) vs $40.0\%$ (PASS)
- NumPy standard deviation, median, and class mean calculations
- Missing file and corrupt schema handling

---

## 🌐 Running the Optional Frontend Web Dashboard

The completed React web application is preserved in `frontend/`. It currently runs as a standalone client-side demo with rich visualizations:

```powershell
cd frontend
npm install
npm run dev
```
Open **`http://localhost:3000/`** in your browser to view the floating glass dashboard.

---

## 📜 Academic Evaluation Rules

### Pass Condition:
A student passes if and only if:
1. Cumulative average is at least **40%**
2. Every subject mark is at least **35**
3. Attendance is at least **75%**

### Grading Scale:
- **A+**: 90% – 100%
- **A**: 80% – below 90%
- **B**: 70% – below 80%
- **C**: 60% – below 70%
- **D**: 50% – below 60%
- **E**: 40% – below 50%
- **F**: Below 40%

### Performance Status Tiers:
- **EXCELLENT**: Average $\ge 85$ AND Attendance $\ge 90$
- **GOOD**: Average $\ge 70$ AND Attendance $\ge 80$
- **NEEDS IMPROVEMENT**: Average $\ge 50$ AND Attendance $\ge 75$
- **AT RISK**: Average $< 50$ OR Attendance $< 75$

---

## 👤 Author & Academic Submission

- **Student Name**: `[STUDENT NAME — FILL IN]`
- **Course**: Python with AI
- **Repository**: `https://github.com/[YOUR-USERNAME]/NEXORA`
- **Documentation**: See `documentation/Project_Documentation.md` for full 22-section project report.
