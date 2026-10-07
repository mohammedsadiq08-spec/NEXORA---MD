import React from 'react';
import { 
  CalendarCheck, 
  CheckCircle, 
  AlertTriangle, 
  ShieldAlert, 
  TrendingUp, 
  ArrowUpRight, 
  Users, 
  Mail, 
  Sparkles,
  Download
} from 'lucide-react';
import KpiCard from '../components/common/KpiCard';
import RiskBadge from '../components/common/RiskBadge';
import { useStudents } from '../context/StudentContext';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  CartesianGrid
} from 'recharts';

export default function AttendanceView() {
  const { analytics, navigateToStudent, openQuickAction, openExport } = useStudents();

  if (!analytics) return null;

  const above90 = analytics.students.filter(s => s.attendance >= 90);
  const between75and89 = analytics.students.filter(s => s.attendance >= 75 && s.attendance < 90);
  const below75 = analytics.students.filter(s => s.attendance < 75);
  const criticalAttendance = analytics.students.filter(s => s.attendance < 65);

  // Attendance distribution bins
  const attendanceBins = [
    { range: '< 65% (Critical)', count: criticalAttendance.length, color: '#F43F5E' },
    { range: '65 - 74% (Warning)', count: analytics.students.filter(s => s.attendance >= 65 && s.attendance < 75).length, color: '#F59E0B' },
    { range: '75 - 84% (Adequate)', count: analytics.students.filter(s => s.attendance >= 75 && s.attendance < 85).length, color: '#8B5CF6' },
    { range: '85 - 89% (Good)', count: analytics.students.filter(s => s.attendance >= 85 && s.attendance < 90).length, color: '#3B82F6' },
    { range: '90 - 100% (High)', count: above90.length, color: '#10B981' },
  ];

  // Scatter plot data: Attendance (X) vs Performance Avg (Y)
  const scatterData = analytics.students.map(s => ({
    name: s.name,
    attendance: s.attendance,
    average: s.average,
    department: s.department,
    grade: s.grade
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Attendance Intelligence
            </h1>
            <span className="text-xs font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-bold">
              Correlation Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Detect absenteeism patterns, regulatory threshold deficits, and academic correlation.
          </p>
        </div>

        <button
          onClick={() => openExport('all')}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-blue-400" />
          <span>Export Attendance List</span>
        </button>
      </div>

      {/* 4 Attendance KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Average Attendance"
          value={`${analytics.averageAttendance}%`}
          subtitle="Cohort Mean Presence"
          icon={CalendarCheck}
          variant="blue"
          trend="+1.2%"
          trendType="up"
        />

        <KpiCard
          title="Above 90% (Exemplary)"
          value={above90.length}
          subtitle={`${Math.round((above90.length/analytics.totalCount)*100)}% of Class`}
          icon={CheckCircle}
          variant="emerald"
        />

        <KpiCard
          title="Below 75% (Shortage)"
          value={below75.length}
          subtitle="Barred from exams without condonation"
          icon={AlertTriangle}
          variant="amber"
        />

        <KpiCard
          title="Critical (<65%)"
          value={criticalAttendance.length}
          subtitle="Immediate faculty intervention"
          icon={ShieldAlert}
          variant="rose"
        />
      </div>

      {/* Row 2: Attendance vs Performance Correlation & Attendance Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scatter Correlation Plot */}
        <div className="lg:col-span-2 bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Attendance vs Academic Performance Correlation
                </h3>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono">
                  r = +0.84 (High Positive)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Each node represents a student: Attendance % (X-Axis) vs GPA % (Y-Axis)
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis 
                  type="number" 
                  dataKey="attendance" 
                  name="Attendance" 
                  unit="%" 
                  domain={[50, 100]} 
                  stroke="#64748B" 
                  fontSize={11}
                  tickLine={false} 
                />
                <YAxis 
                  type="number" 
                  dataKey="average" 
                  name="Average GPA" 
                  unit="%" 
                  domain={[30, 100]} 
                  stroke="#64748B" 
                  fontSize={11}
                  tickLine={false} 
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val, name, item) => [
                    `${val}%`, 
                    name === 'Attendance' ? 'Attendance' : 'GPA'
                  ]}
                />
                <Scatter name="Students" data={scatterData} fill="#38BDF8">
                  {scatterData.map((entry, index) => {
                    const color = entry.average >= 80 ? '#10B981' : entry.attendance < 70 ? '#F43F5E' : '#3B82F6';
                    return <Cell key={`scatter-${index}`} fill={color} />;
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Distribution Histogram */}
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight mb-1">
              Attendance Distribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Number of students in each attendance tier
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceBins} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <XAxis type="number" stroke="#64748B" fontSize={10} tickLine={false} allowDecimals={false} />
                <YAxis dataKey="range" type="category" stroke="#94A3B8" fontSize={9} tickLine={false} width={85} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '10px', fontSize: '11px' }}
                  formatter={(val) => [`${val} Students`, 'Count']}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {attendanceBins.map((entry, index) => (
                    <Cell key={`bin-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Mandatory Criteria: <strong className="text-slate-200">≥ 75% for Exam Hall Ticket</strong>
          </div>
        </div>
      </div>

      {/* Section: Attendance Shortage & Warning Table */}
      <div className="bg-[#0F172A]/70 backdrop-blur-md border border-rose-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Attendance Shortage & Intervention List ({below75.length} Students)
              </h3>
              <p className="text-xs text-slate-400">
                Students below the 75% university regulatory attendance threshold
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-center">Attendance %</th>
                <th className="py-3 px-4 text-center">GPA %</th>
                <th className="py-3 px-4">Risk Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {below75.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => navigateToStudent(student.id)}
                  className="hover:bg-rose-500/5 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-slate-300">
                    {student.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-7 h-7 rounded-full object-cover border border-rose-500/40"
                      />
                      <span className="font-semibold text-white hover:text-blue-400">
                        {student.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {student.department}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-rose-400">
                    {student.attendance}%
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-slate-300">
                    {student.average}%
                  </td>
                  <td className="py-3 px-4">
                    <RiskBadge level={student.riskLevel} size="small" />
                  </td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => openQuickAction(student)}
                      className="px-3 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ml-auto"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Notice</span>
                    </button>
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
