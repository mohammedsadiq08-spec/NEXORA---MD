// Realistic Student Performance Dataset for NEXORA Analytics Engine

export const INITIAL_STUDENTS = [
  {
    id: "NX-2024-001",
    name: "Aarav Sharma",
    email: "aarav.sharma@nexora.edu",
    department: "CSE AI/ML",
    semester: "Semester 6",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 95,
      ai: 92,
      sql: 88,
      mathematics: 94,
      networks: 89
    },
    attendance: 96,
    historical: [88, 90, 93, 91, 95],
    assessments: {
      mid1: 91,
      mid2: 94,
      assignments: 98,
      finalProject: 95
    },
    notes: "Consistently top performer. Demonstrates strong intuition for neural network architectures."
  },
  {
    id: "NX-2024-002",
    name: "Priya Patel",
    email: "priya.patel@nexora.edu",
    department: "CSE",
    semester: "Semester 6",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 91,
      ai: 89,
      sql: 94,
      mathematics: 86,
      networks: 92
    },
    attendance: 94,
    historical: [84, 87, 89, 92, 91],
    assessments: {
      mid1: 89,
      mid2: 92,
      assignments: 95,
      finalProject: 93
    },
    notes: "Excellent SQL and system architecture skills. Capable of mentoring junior peers."
  },
  {
    id: "NX-2024-003",
    name: "Rohan Varma",
    email: "rohan.varma@nexora.edu",
    department: "CSE AI/ML",
    semester: "Semester 6",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 94,
      ai: 96,
      sql: 82,
      mathematics: 91,
      networks: 84
    },
    attendance: 91,
    historical: [85, 88, 90, 93, 94],
    assessments: {
      mid1: 88,
      mid2: 93,
      assignments: 92,
      finalProject: 96
    },
    notes: "Exceptional AI implementation and PyTorch capability. High aptitude in algorithms."
  },
  {
    id: "NX-2024-004",
    name: "Ananya Iyer",
    email: "ananya.iyer@nexora.edu",
    department: "IT",
    semester: "Semester 6",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 88,
      ai: 85,
      sql: 91,
      mathematics: 84,
      networks: 87
    },
    attendance: 92,
    historical: [80, 83, 85, 87, 88],
    assessments: {
      mid1: 84,
      mid2: 87,
      assignments: 90,
      finalProject: 89
    },
    notes: "Solid analytical capability, balanced across all disciplines."
  },
  {
    id: "NX-2024-005",
    name: "Vikram Malhotra",
    email: "vikram.m@nexora.edu",
    department: "ECE",
    semester: "Semester 6",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 82,
      ai: 78,
      sql: 79,
      mathematics: 95,
      networks: 94
    },
    attendance: 88,
    historical: [79, 81, 84, 85, 86],
    assessments: {
      mid1: 83,
      mid2: 86,
      assignments: 88,
      finalProject: 87
    },
    notes: "Outstanding in Mathematics and Computer Networks; practical hardware interfacing."
  },
  {
    id: "NX-2024-006",
    name: "Kavya Deshmukh",
    email: "kavya.d@nexora.edu",
    department: "CSE",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 85,
      ai: 81,
      sql: 88,
      mathematics: 80,
      networks: 82
    },
    attendance: 90,
    historical: [76, 79, 82, 84, 85],
    assessments: {
      mid1: 80,
      mid2: 83,
      assignments: 87,
      finalProject: 85
    },
    notes: "Consistent performer with quick learning velocity."
  },
  {
    id: "NX-2024-007",
    name: "Siddharth Nair",
    email: "siddharth.n@nexora.edu",
    department: "CSE AI/ML",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 89,
      ai: 84,
      sql: 76,
      mathematics: 88,
      networks: 79
    },
    attendance: 87,
    historical: [77, 80, 81, 85, 86],
    assessments: {
      mid1: 81,
      mid2: 84,
      assignments: 89,
      finalProject: 86
    },
    notes: "Good grasp of statistical modeling."
  },
  {
    id: "NX-2024-008",
    name: "Neha Reddy",
    email: "neha.reddy@nexora.edu",
    department: "IT",
    semester: "Semester 6",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 79,
      ai: 75,
      sql: 85,
      mathematics: 77,
      networks: 81
    },
    attendance: 85,
    historical: [72, 75, 78, 79, 81],
    assessments: {
      mid1: 76,
      mid2: 79,
      assignments: 83,
      finalProject: 80
    },
    notes: "Strong in database queries; needs moderate focus on AI mathematics."
  },
  {
    id: "NX-2024-009",
    name: "Aditya Roy",
    email: "aditya.roy@nexora.edu",
    department: "ECE",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 74,
      ai: 70,
      sql: 78,
      mathematics: 83,
      networks: 86
    },
    attendance: 84,
    historical: [70, 73, 75, 77, 78],
    assessments: {
      mid1: 75,
      mid2: 78,
      assignments: 80,
      finalProject: 79
    },
    notes: "Good network protocols understanding, average in high-level coding."
  },
  {
    id: "NX-2024-010",
    name: "Meera Krishnan",
    email: "meera.k@nexora.edu",
    department: "CSE",
    semester: "Semester 6",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 83,
      ai: 80,
      sql: 82,
      mathematics: 74,
      networks: 77
    },
    attendance: 89,
    historical: [74, 77, 79, 81, 82],
    assessments: {
      mid1: 78,
      mid2: 81,
      assignments: 84,
      finalProject: 82
    },
    notes: "Steady progress, good participation in technical assignments."
  },
  {
    id: "NX-2024-011",
    name: "Karan Johar",
    email: "karan.j@nexora.edu",
    department: "CSE AI/ML",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 76,
      ai: 72,
      sql: 75,
      mathematics: 70,
      networks: 71
    },
    attendance: 81,
    historical: [68, 70, 72, 74, 75],
    assessments: {
      mid1: 71,
      mid2: 74,
      assignments: 77,
      finalProject: 75
    },
    notes: "Average academic record. Would benefit from supplemental coding labs."
  },
  {
    id: "NX-2024-012",
    name: "Tanvi Saxena",
    email: "tanvi.s@nexora.edu",
    department: "IT",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 75,
      ai: 68,
      sql: 80,
      mathematics: 71,
      networks: 72
    },
    attendance: 83,
    historical: [69, 71, 73, 74, 75],
    assessments: {
      mid1: 72,
      mid2: 74,
      assignments: 78,
      finalProject: 76
    },
    notes: "Passes all core benchmarks, requires support in AI reasoning."
  },
  {
    id: "NX-2024-013",
    name: "Arjun Sen",
    email: "arjun.sen@nexora.edu",
    department: "ECE",
    semester: "Semester 6",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 68,
      ai: 62,
      sql: 71,
      mathematics: 76,
      networks: 78
    },
    attendance: 80,
    historical: [66, 68, 70, 71, 72],
    assessments: {
      mid1: 69,
      mid2: 71,
      assignments: 74,
      finalProject: 73
    },
    notes: "Hardware focus, needs remediation in Python syntax and scripting."
  },
  {
    id: "NX-2024-014",
    name: "Divya Nambiar",
    email: "divya.n@nexora.edu",
    department: "CSE",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 72,
      ai: 67,
      sql: 73,
      mathematics: 68,
      networks: 69
    },
    attendance: 78,
    historical: [65, 67, 69, 70, 71],
    assessments: {
      mid1: 68,
      mid2: 70,
      assignments: 73,
      finalProject: 72
    },
    notes: "Grade hovering in C+ band. Attendance needs monitoring."
  },
  {
    id: "NX-2024-015",
    name: "Sameer Joshi",
    email: "sameer.j@nexora.edu",
    department: "IT",
    semester: "Semester 6",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 70,
      ai: 65,
      sql: 74,
      mathematics: 64,
      networks: 68
    },
    attendance: 76,
    historical: [62, 65, 67, 68, 69],
    assessments: {
      mid1: 66,
      mid2: 68,
      assignments: 71,
      finalProject: 70
    },
    notes: "Shows sporadic enthusiasm; requires structured weekly milestones."
  },
  {
    id: "NX-2024-016",
    name: "Ritu Kapoor",
    email: "ritu.k@nexora.edu",
    department: "ECE",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 65,
      ai: 60,
      sql: 68,
      mathematics: 72,
      networks: 73
    },
    attendance: 77,
    historical: [61, 64, 66, 67, 68],
    assessments: {
      mid1: 65,
      mid2: 67,
      assignments: 70,
      finalProject: 69
    },
    notes: "Requires conceptual clarification in Artificial Intelligence algorithms."
  },
  {
    id: "NX-2024-017",
    name: "Varun Gupta",
    email: "varun.g@nexora.edu",
    department: "CSE",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 62,
      ai: 58,
      sql: 65,
      mathematics: 61,
      networks: 64
    },
    attendance: 74,
    historical: [58, 60, 61, 63, 62],
    assessments: {
      mid1: 60,
      mid2: 62,
      assignments: 65,
      finalProject: 63
    },
    notes: "Borderline attendance (74%) and below-average test grades."
  },
  {
    id: "NX-2024-018",
    name: "Ishaan Mehta",
    email: "ishaan.m@nexora.edu",
    department: "CSE AI/ML",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 66,
      ai: 55,
      sql: 63,
      mathematics: 59,
      networks: 61
    },
    attendance: 73,
    historical: [56, 58, 60, 62, 61],
    assessments: {
      mid1: 59,
      mid2: 61,
      assignments: 64,
      finalProject: 62
    },
    notes: "Moderate risk. Needs intervention in AI theory and mathematical rigor."
  },
  {
    id: "NX-2024-019",
    name: "Pooja Hegde",
    email: "pooja.h@nexora.edu",
    department: "IT",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 60,
      ai: 56,
      sql: 64,
      mathematics: 54,
      networks: 58
    },
    attendance: 71,
    historical: [54, 56, 58, 59, 58],
    assessments: {
      mid1: 56,
      mid2: 58,
      assignments: 61,
      finalProject: 60
    },
    notes: "Attendance below 75% threshold. Mathematics performance is declining."
  },
  {
    id: "NX-2024-020",
    name: "Manoj Kumar",
    email: "manoj.k@nexora.edu",
    department: "ECE",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 58,
      ai: 52,
      sql: 60,
      mathematics: 56,
      networks: 55
    },
    attendance: 70,
    historical: [52, 54, 55, 57, 56],
    assessments: {
      mid1: 53,
      mid2: 56,
      assignments: 59,
      finalProject: 57
    },
    notes: "High academic risk. Lags in AI assignments and core lab activities."
  },
  {
    id: "NX-2024-021",
    name: "Rahul Verma",
    email: "rahul.verma@nexora.edu",
    department: "CSE",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 54,
      ai: 48,
      sql: 56,
      mathematics: 46,
      networks: 58
    },
    attendance: 68,
    historical: [50, 51, 52, 54, 52],
    assessments: {
      mid1: 49,
      mid2: 52,
      assignments: 55,
      finalProject: 53
    },
    notes: "Critical Risk: Low marks in Mathematics (46) + 68% attendance. Urgent mentoring requested."
  },
  {
    id: "NX-2024-022",
    name: "Sneha Nair",
    email: "sneha.n@nexora.edu",
    department: "IT",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 52,
      ai: 45,
      sql: 54,
      mathematics: 48,
      networks: 50
    },
    attendance: 66,
    historical: [48, 49, 50, 51, 50],
    assessments: {
      mid1: 47,
      mid2: 50,
      assignments: 53,
      finalProject: 51
    },
    notes: "Critical Risk: Multiple failed quizzes in AI and weak attendance track record."
  },
  {
    id: "NX-2024-023",
    name: "Devendra Patil",
    email: "devendra.p@nexora.edu",
    department: "ECE",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 49,
      ai: 42,
      sql: 52,
      mathematics: 50,
      networks: 48
    },
    attendance: 64,
    historical: [45, 46, 47, 49, 48],
    assessments: {
      mid1: 45,
      mid2: 48,
      assignments: 51,
      finalProject: 49
    },
    notes: "Critical Risk: Severe attendance deficit (64%) and failed AI module."
  },
  {
    id: "NX-2024-024",
    name: "Karanvir Singh",
    email: "karanvir.s@nexora.edu",
    department: "CSE AI/ML",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 46,
      ai: 39,
      sql: 48,
      mathematics: 42,
      networks: 45
    },
    attendance: 61,
    historical: [42, 43, 44, 45, 44],
    assessments: {
      mid1: 41,
      mid2: 44,
      assignments: 47,
      finalProject: 45
    },
    notes: "Critical Risk: Scored 39 in AI (Below 40 threshold). Immediate parent-faculty council needed."
  },
  {
    id: "NX-2024-025",
    name: "Deepak Mishra",
    email: "deepak.m@nexora.edu",
    department: "CSE",
    semester: "Semester 4",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    scores: {
      python: 56,
      ai: 49,
      sql: 58,
      mathematics: 45,
      networks: 52
    },
    attendance: 69,
    historical: [49, 51, 53, 54, 53],
    assessments: {
      mid1: 50,
      mid2: 53,
      assignments: 57,
      finalProject: 54
    },
    notes: "High Risk: Failed Mathematics internal (45) with frequent attendance lapses."
  }
];

export const SUBJECT_INFO = {
  python: { name: "Python Programming", code: "CS-301", icon: "Code2", credits: 4, faculty: "Dr. A. Kulkarni" },
  ai: { name: "Artificial Intelligence", code: "CS-302", icon: "Brain", credits: 4, faculty: "Prof. S. Raman" },
  sql: { name: "Database & SQL", code: "CS-303", icon: "Database", credits: 3, faculty: "Dr. M. Chawla" },
  mathematics: { name: "Applied Mathematics", code: "MA-301", icon: "Binary", credits: 4, faculty: "Prof. R. Sengupta" },
  networks: { name: "Computer Networks", code: "CS-304", icon: "Network", credits: 3, faculty: "Dr. V. Hegde" }
};

export const DEPARTMENTS = ["All", "CSE AI/ML", "CSE", "ECE", "IT"];
export const SEMESTERS = ["All", "Semester 4", "Semester 6"];

// Analytics Helper Engine (simulating Pandas/NumPy metrics client-side)

export function calculateStudentMetrics(student) {
  const scoreValues = Object.values(student.scores);
  const totalMarks = scoreValues.reduce((sum, score) => sum + score, 0);
  const average = Number((totalMarks / scoreValues.length).toFixed(1));
  
  // Grade calculation
  let grade = "F";
  if (average >= 90) grade = "A+";
  else if (average >= 80) grade = "A";
  else if (average >= 70) grade = "B";
  else if (average >= 60) grade = "C";
  else if (average >= 50) grade = "D";
  else grade = "F";

  // Status calculation
  let status = "Needs Improvement";
  if (average >= 85 && student.attendance >= 85) status = "Excellent";
  else if (average >= 70 && student.attendance >= 75) status = "Good";
  else if (average < 55 || student.attendance < 70) status = "At Risk";

  // Risk Level calculation
  let riskLevel = "Safe";
  let riskReason = "On Track";
  let recommendation = "Maintain current momentum and engage in peer mentorship.";
  
  const minScore = Math.min(...scoreValues);
  const weakestSubjectKey = Object.keys(student.scores).find(key => student.scores[key] === minScore);
  const weakestSubjectName = SUBJECT_INFO[weakestSubjectKey]?.name || "Core Subjects";

  if (average < 50 || student.attendance < 65 || minScore < 40) {
    riskLevel = "Critical";
    riskReason = minScore < 40 
      ? `Failed minimum benchmark in ${weakestSubjectName} (${minScore})`
      : `Critical attendance (${student.attendance}%) & low GPA (${average}%)`;
    recommendation = `Immediate faculty mentoring required. Schedule remedial sessions in ${weakestSubjectName} and send attendance notification.`;
  } else if (average < 60 || student.attendance < 75 || minScore < 50) {
    riskLevel = "High";
    riskReason = `Below passing average in ${weakestSubjectName} & attendance under 75%`;
    recommendation = `Attend weekly guided practice labs in ${weakestSubjectName} and improve class participation.`;
  } else if (average < 70 || student.attendance < 80) {
    riskLevel = "Moderate";
    riskReason = `Mild performance dip in ${weakestSubjectName}`;
    recommendation = `Target assignment deadlines earlier and focus on core revision in ${weakestSubjectName}.`;
  } else if (average >= 88) {
    recommendation = `Exceptional performer. Recommended for research paper publication and advanced honors project.`;
  }

  return {
    ...student,
    totalMarks,
    average,
    grade,
    status,
    riskLevel,
    riskReason,
    weakestSubject: weakestSubjectName,
    recommendation
  };
}

export function computeGlobalAnalytics(students) {
  const enriched = students.map(calculateStudentMetrics);
  
  // Sort descending by average to compute ranks
  enriched.sort((a, b) => b.average - a.average);
  enriched.forEach((s, idx) => {
    s.rank = idx + 1;
  });

  const totalCount = enriched.length;
  if (totalCount === 0) return null;

  const totalAvg = Number((enriched.reduce((acc, s) => acc + s.average, 0) / totalCount).toFixed(1));
  const totalAttendance = Number((enriched.reduce((acc, s) => acc + s.attendance, 0) / totalCount).toFixed(1));
  
  const passCount = enriched.filter(s => s.average >= 50 && Object.values(s.scores).every(score => score >= 40)).length;
  const passRate = Number(((passCount / totalCount) * 100).toFixed(1));
  
  const atRiskCount = enriched.filter(s => s.riskLevel === "Critical" || s.riskLevel === "High").length;
  const criticalCount = enriched.filter(s => s.riskLevel === "Critical").length;
  const highRiskCount = enriched.filter(s => s.riskLevel === "High").length;
  const moderateRiskCount = enriched.filter(s => s.riskLevel === "Moderate").length;

  const scoresList = enriched.map(s => s.average).sort((a, b) => a - b);
  const highestScore = Math.max(...scoresList);
  const lowestScore = Math.min(...scoresList);
  
  // Median
  const mid = Math.floor(scoresList.length / 2);
  const median = scoresList.length % 2 !== 0 
    ? scoresList[mid] 
    : Number(((scoresList[mid - 1] + scoresList[mid]) / 2).toFixed(1));

  // Standard Deviation (NumPy std)
  const variance = scoresList.reduce((acc, val) => acc + Math.pow(val - totalAvg, 2), 0) / totalCount;
  const stdDev = Number(Math.sqrt(variance).toFixed(1));

  // Subject Averages
  const subjectKeys = Object.keys(SUBJECT_INFO);
  const subjectMetrics = subjectKeys.map(key => {
    const keyScores = enriched.map(s => s.scores[key]);
    const avg = Number((keyScores.reduce((a, b) => a + b, 0) / totalCount).toFixed(1));
    const highest = Math.max(...keyScores);
    const lowest = Math.min(...keyScores);
    const passCountSubject = keyScores.filter(sc => sc >= 40).length;
    const passRateSubject = Number(((passCountSubject / totalCount) * 100).toFixed(1));
    const below40Count = keyScores.filter(sc => sc < 40).length;

    return {
      key,
      name: SUBJECT_INFO[key].name,
      code: SUBJECT_INFO[key].code,
      faculty: SUBJECT_INFO[key].faculty,
      average: avg,
      highest,
      lowest,
      passRate: passRateSubject,
      below40Count
    };
  });

  subjectMetrics.sort((a, b) => b.average - a.average);
  const bestSubject = subjectMetrics[0];
  const weakestSubject = subjectMetrics[subjectMetrics.length - 1];

  // Grade Distribution
  const gradeDist = {
    "A+": enriched.filter(s => s.grade === "A+").length,
    "A": enriched.filter(s => s.grade === "A").length,
    "B": enriched.filter(s => s.grade === "B").length,
    "C": enriched.filter(s => s.grade === "C").length,
    "D": enriched.filter(s => s.grade === "D").length,
    "F": enriched.filter(s => s.grade === "F").length,
  };

  return {
    students: enriched,
    totalCount,
    classAverage: totalAvg,
    averageAttendance: totalAttendance,
    passRate,
    atRiskCount,
    criticalCount,
    highRiskCount,
    moderateRiskCount,
    highestScore,
    lowestScore,
    median,
    stdDev,
    subjectMetrics,
    bestSubject,
    weakestSubject,
    gradeDist
  };
}
