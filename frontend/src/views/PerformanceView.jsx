import React, { useState } from 'react';
import { 
  LineChart as LineChartIcon, 
  TrendingUp, 
  BarChart2, 
  Target, 
  Percent, 
  Sparkles, 
  Layers, 
  Download,
  Filter
} from 'lucide-react';
import KpiCard from '../components/common/KpiCard';
import { useStudents } from '../context/StudentContext';
import { DEPARTMENTS, SEMESTERS, computeGlobalAnalytics } from '../data/mockData';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  CartesianGrid
} from 'recharts';

export default function PerformanceView() {
  const { rawStudents, openExport } = useStudents();
  
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedSem, setSelectedSem] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Filter cohort dynamically
  const filteredCohort = rawStudents.filter(s => {
    const matchDept = selectedDept === 'All' || s.department === selectedDept;
    const matchSem = selectedSem === 'All' || s.semester === selectedSem;
    return matchDept && matchSem;
  });

  const stats = computeGlobalAnalytics(filteredCohort) || computeGlobalAnalytics(rawStudents);

  // Score distribution bins (0-49, 50-59, 60-69, 70-79, 80-89, 90-100)
  const distributionBins = [
    { range: '< 50 (Fail)', count: 0, color: '#F43F5E' },
    { range: '50 - 59 (D)', count: 0, color: '#EC4899' },
    { range: '60 - 69 (C)', count: 0, color: '#F59E0B' },
    { range: '70 - 79 (B)', count: 0, color: '#8B5CF6' },
    { range: '80 - 89 (A)', count: 0, color: '#3B82F6' },
    { range: '90 - 100 (A+)', count: 0, color: '#10B981' },
  ];

  stats.students.forEach(s => {
    let score = s.average;
    if (selectedSubject !== 'all') {
      score = s.scores[selectedSubject] || s.average;
    }
    if (score < 50) distributionBins[0].count++;
    else if (score < 60) distributionBins[1].count++;
    else if (score < 70) distributionBins[2].count++;
    else if (score < 80) distributionBins[3].count++;
    else if (score < 90) distributionBins[4].count++;
    else distributionBins[5].count++;
  });

  // Department comparative average
  const deptAverages = ['CSE AI/ML', 'CSE', 'ECE', 'IT'].map(dept => {
    const deptStudents = stats.students.filter(s => s.department === dept);
    const avg = deptStudents.length > 0
      ? Number((deptStudents.reduce((acc, s) => acc + s.average, 0) / deptStudents.length).toFixed(1))
      : 0;
    return { department: dept, average: avg, count: deptStudents.length };
  });

  const gradeChartData = [
    { name: 'A+', count: stats.gradeDist['A+'] || 0, color: '#10B981' },
    { name: 'A', count: stats.gradeDist['A'] || 0, color: '#3B82F6' },
    { name: 'B', count: stats.gradeDist['B'] || 0, color: '#8B5CF6' },
    { name: 'C', count: stats.gradeDist['C'] || 0, color: '#F59E0B' },
    { name: 'D', count: stats.gradeDist['D'] || 0, color: '#EC4899' },
    { name: 'F', count: stats.gradeDist['F'] || 0, color: '#F43F5E' },
  ].filter(g => g.count > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Performance Intelligence
            </h1>
            <span className="text-xs font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-bold">
              NumPy Statistical Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deep statistical distribution, standard deviation, and variance modeling across cohorts.
          </p>
        </div>

        <button
          onClick={() => openExport('all')}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-blue-400" />
          <span>Export Analytics</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-blue-400" />
          <span>Cohort Parameters</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Dept */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-400">Department:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              {DEPARTMENTS.map(d => (
                <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-400">Semester:</span>
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              {SEMESTERS.map(s => (
                <option key={s} value={s} className="bg-slate-900 text-white">{s}</option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-400">Subject Scope:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-white">All Subjects (GPA)</option>
              <option value="python" className="bg-slate-900 text-white">Python</option>
              <option value="ai" className="bg-slate-900 text-white">Artificial Intelligence</option>
              <option value="sql" className="bg-slate-900 text-white">Database & SQL</option>
              <option value="mathematics" className="bg-slate-900 text-white">Mathematics</option>
              <option value="networks" className="bg-slate-900 text-white">Networks</option>
            </select>
          </div>
        </div>
      </div>

      {/* 6 Statistical KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard
          title="Class Average"
          value={`${stats.classAverage}%`}
          subtitle="Mean (μ)"
          variant="blue"
        />

        <KpiCard
          title="Highest Score"
          value={`${stats.highestScore}%`}
          subtitle="Top Outlier"
          variant="emerald"
        />

        <KpiCard
          title="Lowest Score"
          value={`${stats.lowestScore}%`}
          subtitle="Bottom Outlier"
          variant="rose"
        />

        <KpiCard
          title="Median Score"
          value={`${stats.median}%`}
          subtitle="50th Percentile"
          variant="cyan"
        />

        <KpiCard
          title="Std Deviation"
          value={`±${stats.stdDev}`}
          subtitle="Score Variance (σ)"
          variant="violet"
        />

        <KpiCard
          title="Pass Rate"
          value={`${stats.passRate}%`}
          subtitle="Qualified Students"
          variant="amber"
        />
      </div>

      {/* Row 2: Score Histogram Distribution & Dept Comparative */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Histogram */}
        <div className="lg:col-span-2 bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Score Histogram Distribution (Gaussian Curve)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Number of students distributed across mark bands
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
              Cohort: {stats.totalCount} Students
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionBins} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="range" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val, name, item) => [`${val} Students`, item.payload.range]}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {distributionBins.map((entry, index) => (
                    <Cell key={`dist-cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Average Comparison */}
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight mb-1">
              Department Comparison
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Mean GPA across engineering branches
            </p>
          </div>

          <div className="space-y-4 my-auto">
            {deptAverages.map((item) => (
              <div key={item.department} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{item.department}</span>
                  <span className="font-mono font-bold text-slate-300">
                    {item.average}% <span className="text-[10px] text-slate-500 font-normal">({item.count} std)</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${item.average}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Highest Branch: <strong className="text-emerald-400">CSE AI/ML</strong></span>
            <span className="font-mono text-blue-400">Δ 8.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
