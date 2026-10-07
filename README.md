# NEXORA — Next-Generation Student Performance Analytics System

> **“Turning Student Data into Meaningful Insights.”**

NEXORA is a high-performance student analytics intelligence system built on Python, NumPy, and Pandas. It transforms academic marks, attendance logs, and curriculum records into actionable diagnostic insights for faculty coordinators, department heads, and academic councils.

---

## 📁 Project Architecture

```
NEXORA/
│
├── frontend/                     # React + Vite + Tailwind CSS Analytics UI
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── backend/                      # Python Statistical Analytics Engine
│   ├── main.py                   # Main CLI entry point & dashboard summary
│   ├── config.py                 # Centralized academic benchmarks & rules
│   ├── data_loader.py            # CSV loading & schema validation (Pandas)
│   ├── calculations.py           # Core mark calculations & results (NumPy/Pandas)
│   ├── analytics.py              # Statistical aggregations & distributions
│   └── recommendations.py        # Rule-based diagnostic intervention engine
│
├── data/                         # Raw Dataset Storage
│   └── students.csv              # 30-student raw benchmark dataset
│
├── documentation/                # Architecture & Analytical specifications
│   └── ANALYTICS_GUIDE.md
│
├── screenshots/                  # System screenshots & visual assets
│
├── README.md                     # Project overview & running instructions
│
└── requirements.txt              # Minimal Python dependencies (pandas, numpy)
```

---

## 🔬 Core Academic Concepts Demonstrated

1. **Python Fundamentals**: Variables, strict data types, conditional branching, iteration loops, and modular functions.
2. **NumPy Vectorization**: Array computations for means (`np.mean`), medians (`np.median`), standard deviations (`np.std`), maximums (`np.max`), and minimums (`np.min`).
3. **Pandas DataFrames**: CSV data loading, column type casting, aggregations (`groupby`), boolean filtering, and calculated series.
4. **Data Analytics**: Subject difficulty benchmarking, attendance correlation, multi-tier risk diagnostic modeling, and performance distributions.

---

## 🚀 Running the Python Backend

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Execute Analytics Pipeline
```bash
python backend/main.py
```

---

## 💻 Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000/`.
