import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  CheckCircle, 
  CalendarCheck, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight, 
  Trophy, 
  ChevronRight,
  Filter,
  Sparkles,
  Download
} from 'lucide-react';
import KpiCard from '../components/common/KpiCard';
import StatusBadge from '../components/common/StatusBadge';
import RiskBadge from '../components/common/RiskBadge';
import { useStudents } from '../context/StudentContext';
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
  Cell 
} from 'recharts';

export default function DashboardView() {
  const { analytics, navigateToStudent, setCurrentPage, openExport, openQuickAction } = useStudents();
  const [timeFilter, setTimeFilter] = useState('Semester');

  if (!analytics) return null;

  const topStudents = analytics.students.slice(0, 5);
  const attentionStudents = analytics.students.filter(s => s.riskLevel === 'Critical' || s.riskLevel === 'High').slice(0, 5);

  const performanceTrendsByTime = {
    Weekly: [
      { name: 'Wk 1', score: 62, target: 70 },
      { name: 'Wk 2', score: 65, target: 70 },
      { name: 'Wk 3', score: 64, target: 70 },
      { name: 'Wk 4', score: 68, target: 70 },
      { name: 'Wk 5', score: 67, target: 70 },
      { name: 'Wk 6', score: 71, target: 70 },
    ],
    Monthly: [
      { name: 'Jan', score: 61, target: 70 },
      { name: 'Feb', score: 64, target: 70 },
      { name: 'Mar', score: 67, target: 70 },
      { name: 'Apr', score: 70, target: 70 },
    ],
    Semester: [
      { name: 'Mid 1', score: 64.2, target: 70 },
      { name: 'Assignment 1', score: 69.8, target: 70 },
      { name: 'Mid 2', score: 67.5, target: 70 },
      { name: 'Assignment 2', score: 72.1, target: 70 },
      { name: 'Project Demo', score: 74.3, target: 70 },
      { name: 'Current Overall', score: analytics.classAverage, target: 70 },
    ]
  };

  const trendData = performanceTrendsByTime[timeFilter];

  const subjectChartData = analytics.subjectMetrics.map(sub => ({
    subject: sub.name.split(' ')[0], // short name
    fullName: sub.name,
    average: sub.average,
    passRate: sub.passRate,
  }));

  const gradeChartData = [
    { name: 'A+', count: analytics.gradeDist['A+'], color: '#10B981' },
    { name: 'A', count: analytics.gradeDist['A'], color: '#3B82F6' },
    { name: 'B', count: analytics.gradeDist['B'], color: '#8B5CF6' },
    { name: 'C', count: analytics.gradeDist['C'], color: '#F59E0B' },
    { name: 'D', count: analytics.gradeDist['D'], color: '#EC4899' },
    { name: 'F', count: analytics.gradeDist['F'], color: '#F43F5E' },
  ].filter(g => g.count > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good Morning, Admin 👋
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Sparkles className="w-3 h-3" /> Live Intelligence
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Here's what's happening with student performance and cohort trends today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-slate-400">Last updated</div>
            <div className="text-xs font-semibold text-slate-200">Just now</div>
          </div>
          <button
            onClick={() => openExport('all')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Row 1: 5 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Total Students"
          value={analytics.totalCount}
          subtitle="Enrolled cohort"
          icon={Users}
          variant="blue"
          trend="Active"
          trendType="neutral"
          onClick={() => setCurrentPage('students')}
        />

        <KpiCard
          title="Class Average"
          value={`${analytics.classAverage}%`}
          subtitle="Cumulative GPA"
          icon={GraduationCap}
          variant="cyan"
          trend="+4.8%"
          trendType="up"
          onClick={() => setCurrentPage('performance')}
        />

        <KpiCard
          title="Pass Rate"
          value={`${analytics.passRate}%`}
          subtitle="Above 50% benchmark"
          icon={CheckCircle}
          variant="emerald"
          trend="21 of 25"
          trendType="up"
          onClick={() => setCurrentPage('performance')}
        />

        <KpiCard
          title="Avg Attendance"
          value={`${analytics.averageAttendance}%`}
          subtitle="Class presence rate"
          icon={CalendarCheck}
          variant="violet"
          trend="+1.2%"
          trendType="up"
          onClick={() => setCurrentPage('attendance')}
        />

        <KpiCard
          title="At-Risk Students"
          value={analytics.atRiskCount}
          subtitle="Requires attention"
          icon={AlertTriangle}
          variant="rose"
          trend="Intervene"
          trendType="down"
          onClick={() => setCurrentPage('at-risk')}
        />
      </div>

      {/* Row 2: Main Performance Overview Area Chart */}
      <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                Cohort Performance Overview
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                NumPy Avg Trend
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Average academic marks progression over consecutive evaluation periods.
            </p>
          </div>

          {/* Time Filter Buttons */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-xl self-start sm:self-auto">
            {['Weekly', 'Monthly', 'Semester'].map((f) => (
              <button
                key={f}
                onClick={() => setTimeFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  timeFilter === f
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="dashboardAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} domain={[40, 100]} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val) => [`${val}%`, 'Cohort Score']}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#3B82F6" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#dashboardAreaGrad)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Subject Performance & Grade Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Performance Horizontal Bars */}
        <div className="lg:col-span-2 bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Subject Performance Benchmark
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cohort average scores across core engineering subjects
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('subjects')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>Deep-Dive</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectChartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" domain={[0, 100]} stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis dataKey="subject" type="category" stroke="#94A3B8" fontSize={11} tickLine={false} width={70} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val, name, item) => [`${val}% Avg (${item.payload.fullName})`, 'Score']}
                />
                <Bar dataKey="average" fill="#3B82F6" radius={[0, 8, 8, 0]}>
                  {subjectChartData.map((entry, index) => {
                    const colors = ['#38BDF8', '#6366F1', '#8B5CF6', '#10B981', '#F59E0B'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grade Distribution Donut */}
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Grade Distribution
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Relative cohort frequency
              </p>
            </div>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeChartData}
                  innerRadius={44}
                  outerRadius={68}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {gradeChartData.map((entry, index) => (
                    <Cell key={`grade-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val, name) => [`${val} Students`, `Grade ${name}`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center">
            {gradeChartData.map(g => (
              <div key={g.name} className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-xs font-bold" style={{ color: g.color }}>Grade {g.name}</div>
                <div className="text-[11px] text-slate-300 font-mono">{g.count} ({Math.round((g.count/analytics.totalCount)*100)}%)</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Top Performers & Students Needing Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Performers */}
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Top Performers
              </h3>
            </div>
            <button
              onClick={() => setCurrentPage('top-performers')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>View Leaderboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topStudents.map((student, idx) => {
              const medals = ['🥇', '🥈', '🥉', '4th', '5th'];
              return (
                <div
                  key={student.id}
                  onClick={() => navigateToStudent(student.id)}
                  className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/40 rounded-xl flex items-center justify-between cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-400 w-6 text-center">
                      {medals[idx]}
                    </span>
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        {student.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {student.department} • {student.id}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-400 font-mono">
                      {student.average}%
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Grade {student.grade}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Students Needing Attention */}
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Students Needing Attention
              </h3>
            </div>
            <button
              onClick={() => setCurrentPage('at-risk')}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <span>View All Risks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {attentionStudents.map((student) => (
              <div
                key={student.id}
                className="p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/40 rounded-xl flex items-center justify-between transition-all"
              >
                <div 
                  onClick={() => navigateToStudent(student.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-9 h-9 rounded-full object-cover border border-rose-500/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-white hover:text-blue-400 transition-colors">
                      {student.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                      {student.riskReason}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <RiskBadge level={student.riskLevel} size="small" />
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      Att: {student.attendance}% | Avg: {student.average}%
                    </div>
                  </div>

                  <button
                    onClick={() => openQuickAction(student)}
                    className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-rose-600/30 rounded-lg transition-colors"
                    title="Quick Intervention"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
