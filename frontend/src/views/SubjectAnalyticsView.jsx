import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Code2, 
  Brain, 
  Database, 
  Binary, 
  Network,
  Users,
  Eye
} from 'lucide-react';
import KpiCard from '../components/common/KpiCard';
import { useStudents } from '../context/StudentContext';
import { SUBJECT_INFO } from '../data/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  CartesianGrid
} from 'recharts';

export default function SubjectAnalyticsView() {
  const { analytics, navigateToStudent } = useStudents();
  const [selectedSubjectKey, setSelectedSubjectKey] = useState('python');

  if (!analytics) return null;

  const activeSubject = analytics.subjectMetrics.find(s => s.key === selectedSubjectKey) || analytics.subjectMetrics[0];

  const subjectIcons = {
    python: Code2,
    ai: Brain,
    sql: Database,
    mathematics: Binary,
    networks: Network
  };

  const ActiveIcon = subjectIcons[selectedSubjectKey] || BookOpen;

  // Chart data
  const comparisonData = analytics.subjectMetrics.map(s => ({
    name: s.name,
    key: s.key,
    average: s.average,
    passRate: s.passRate,
    below40: s.below40Count
  }));

  // Heatmap color generator
  const getCellColor = (score) => {
    if (score >= 90) return 'bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/30';
    if (score >= 80) return 'bg-blue-500/20 text-blue-300 font-bold border-blue-500/30';
    if (score >= 70) return 'bg-indigo-500/15 text-indigo-300 font-semibold border-indigo-500/30';
    if (score >= 50) return 'bg-amber-500/15 text-amber-300 font-semibold border-amber-500/30';
    return 'bg-rose-500/25 text-rose-300 font-bold border-rose-500/40 animate-pulse';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Subject Intelligence
            </h1>
            <span className="text-xs font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-bold">
              Curriculum Diagnostics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Discover subject competencies, faculty benchmarks, and course difficulty matrix.
          </p>
        </div>
      </div>

      {/* Top Cards: Best Subject & Weakest Subject */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Best Performing Subject */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#0A1F1F] border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Best Performing Subject
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
              {analytics.bestSubject.code}
            </span>
          </div>

          <div className="text-2xl font-extrabold text-white tracking-tight">
            {analytics.bestSubject.name} — <span className="text-emerald-400">{analytics.bestSubject.average}%</span>
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-slate-300">
            <span>Pass Rate: <strong className="text-white">{analytics.bestSubject.passRate}%</strong></span>
            <span>•</span>
            <span>Faculty: <strong className="text-white">{analytics.bestSubject.faculty}</strong></span>
          </div>
        </div>

        {/* Weakest Subject */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1F0A14] border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Weakest Performing Subject
              </span>
            </div>
            <span className="text-xs font-mono text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-bold">
              {analytics.weakestSubject.code}
            </span>
          </div>

          <div className="text-2xl font-extrabold text-white tracking-tight">
            {analytics.weakestSubject.name} — <span className="text-rose-400">{analytics.weakestSubject.average}%</span>
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-slate-300">
            <span>Pass Rate: <strong className="text-white">{analytics.weakestSubject.passRate}%</strong></span>
            <span>•</span>
            <span>Below 40: <strong className="text-rose-400">{analytics.weakestSubject.below40Count} Students</strong></span>
          </div>
        </div>
      </div>

      {/* Subject Comparison Bar Chart */}
      <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Subject Score Comparison
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any subject button or chart bar to inspect deep statistics
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {analytics.subjectMetrics.map(sub => (
              <button
                key={sub.key}
                onClick={() => setSelectedSubjectKey(sub.key)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  selectedSubjectKey === sub.key
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {sub.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val, name) => [`${val}%`, 'Average Score']}
              />
              <Bar 
                dataKey="average" 
                radius={[8, 8, 0, 0]}
                onClick={(entry) => setSelectedSubjectKey(entry.key)}
                cursor="pointer"
              >
                {comparisonData.map((entry, index) => {
                  const isSelected = entry.key === selectedSubjectKey;
                  return (
                    <Cell
                      key={`sub-cell-${index}`}
                      fill={isSelected ? '#3B82F6' : '#64748B'}
                      opacity={isSelected ? 1 : 0.6}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Selected Subject Deep-Dive Detail Section */}
      <div className="bg-[#0F172A]/80 border border-blue-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <ActiveIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {activeSubject.name}
                </h3>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {activeSubject.code}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Instructor: {activeSubject.faculty} • Credits: {SUBJECT_INFO[activeSubject.key]?.credits || 4}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-semibold text-slate-400 uppercase">Subject Average</div>
            <div className="text-2xl font-extrabold text-blue-400 font-mono">{activeSubject.average}%</div>
          </div>
        </div>

        {/* Deep metrics 5 cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Class Average</div>
            <div className="text-xl font-bold text-white mt-1 font-mono">{activeSubject.average}%</div>
          </div>

          <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
            <div className="text-[11px] text-emerald-400 font-semibold uppercase">Highest Mark</div>
            <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">{activeSubject.highest}</div>
          </div>

          <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
            <div className="text-[11px] text-rose-400 font-semibold uppercase">Lowest Mark</div>
            <div className="text-xl font-bold text-rose-400 mt-1 font-mono">{activeSubject.lowest}</div>
          </div>

          <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
            <div className="text-[11px] text-cyan-400 font-semibold uppercase">Pass Rate</div>
            <div className="text-xl font-bold text-cyan-400 mt-1 font-mono">{activeSubject.passRate}%</div>
          </div>

          <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl text-center col-span-2 sm:col-span-1">
            <div className="text-[11px] text-amber-400 font-semibold uppercase">Below 40 (Fail)</div>
            <div className="text-xl font-bold text-amber-400 mt-1 font-mono">{activeSubject.below40Count} Students</div>
          </div>
        </div>
      </div>

      {/* Heatmap Matrix Table: Student Performance Across All Subjects */}
      <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Cohort Subject Mark Matrix (Heatmap)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Individual student test scores across all 5 curriculum subjects
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> ≥90</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-500"></span> 80-89</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-indigo-500"></span> 70-79</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500"></span> 50-69</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-500"></span> &lt;50</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-3 text-center">Python</th>
                <th className="py-3 px-3 text-center">AI</th>
                <th className="py-3 px-3 text-center">SQL</th>
                <th className="py-3 px-3 text-center">Maths</th>
                <th className="py-3 px-3 text-center">Networks</th>
                <th className="py-3 px-4 text-right">Overall Avg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {analytics.students.slice(0, 15).map((student) => (
                <tr
                  key={student.id}
                  onClick={() => navigateToStudent(student.id)}
                  className="hover:bg-blue-600/5 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-semibold text-white hover:text-blue-400 transition-colors">
                          {student.name}
                        </span>
                        <span className="text-[10px] text-slate-500 ml-1.5 font-mono">({student.id})</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block w-12 py-1 rounded border text-center font-mono text-xs ${getCellColor(student.scores.python)}`}>
                      {student.scores.python}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block w-12 py-1 rounded border text-center font-mono text-xs ${getCellColor(student.scores.ai)}`}>
                      {student.scores.ai}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block w-12 py-1 rounded border text-center font-mono text-xs ${getCellColor(student.scores.sql)}`}>
                      {student.scores.sql}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block w-12 py-1 rounded border text-center font-mono text-xs ${getCellColor(student.scores.mathematics)}`}>
                      {student.scores.mathematics}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block w-12 py-1 rounded border text-center font-mono text-xs ${getCellColor(student.scores.networks)}`}>
                      {student.scores.networks}
                    </span>
                  </td>

                  <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-200">
                    {student.average}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
