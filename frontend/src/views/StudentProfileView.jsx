import React from 'react';
import { 
  User, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  CalendarCheck, 
  Sparkles, 
  BookOpen, 
  ArrowLeft, 
  Mail, 
  GraduationCap,
  ShieldAlert,
  AlertCircle,
  FileText,
  ChevronDown
} from 'lucide-react';
import KpiCard from '../components/common/KpiCard';
import StatusBadge from '../components/common/StatusBadge';
import RiskBadge from '../components/common/RiskBadge';
import { useStudents } from '../context/StudentContext';
import { SUBJECT_INFO } from '../data/mockData';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  Cell
} from 'recharts';

export default function StudentProfileView() {
  const { selectedStudent, rawStudents, setSelectedStudentId, setCurrentPage, openQuickAction, openExport } = useStudents();

  if (!selectedStudent) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-400">No student selected.</p>
        <button
          onClick={() => setCurrentPage('students')}
          className="mt-4 px-4 py-2 bg-blue-600 rounded-xl text-xs font-semibold text-white"
        >
          View All Students
        </button>
      </div>
    );
  }

  const subjectScoresData = [
    { subject: 'Python', score: selectedStudent.scores.python, fullMark: 100, faculty: 'Dr. A. Kulkarni' },
    { subject: 'AI', score: selectedStudent.scores.ai, fullMark: 100, faculty: 'Prof. S. Raman' },
    { subject: 'SQL', score: selectedStudent.scores.sql, fullMark: 100, faculty: 'Dr. M. Chawla' },
    { subject: 'Maths', score: selectedStudent.scores.mathematics, fullMark: 100, faculty: 'Prof. R. Sengupta' },
    { subject: 'Networks', score: selectedStudent.scores.networks, fullMark: 100, faculty: 'Dr. V. Hegde' },
  ];

  const historicalData = (selectedStudent.historical || [75, 78, 80, 82, 85]).map((score, index) => ({
    name: `Term ${index + 1}`,
    score: score,
    benchmark: 70
  }));

  // Attendance circular stroke calculations
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (selectedStudent.attendance / 100) * circumference;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('students')}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Student 360° Diagnostic Profile
              </h1>
              <span className="text-[10px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">
                {selectedStudent.id}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive deep-dive analytics, learning trajectory, and AI recommendations.
            </p>
          </div>
        </div>

        {/* Quick Student Switcher */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedStudent.id}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs font-semibold text-white px-3 py-2 rounded-xl focus:outline-none focus:border-blue-500 cursor-pointer pr-8"
            >
              {rawStudents.map(s => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                  {s.name} ({s.id})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => openExport('all')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Export 360 PDF</span>
          </button>
        </div>
      </div>

      {/* Hero Student Banner Card */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#111A2E] to-[#0D1527] border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500/40 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-[#0F172A] rounded-full">
                <span className={`block w-3.5 h-3.5 rounded-full ${
                  selectedStudent.attendance >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                }`}></span>
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  {selectedStudent.name}
                </h2>
                <StatusBadge status={selectedStudent.status} size="small" />
                <RiskBadge level={selectedStudent.riskLevel} size="small" />
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                <span className="text-slate-200 font-medium">{selectedStudent.department}</span>
                <span>•</span>
                <span>{selectedStudent.semester}</span>
                <span>•</span>
                <span className="font-mono text-slate-300">{selectedStudent.email}</span>
              </div>

              <p className="text-xs text-slate-400 italic pt-1 max-w-xl">
                "{selectedStudent.notes || 'Enrolled in active core academic coursework.'}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedStudent.riskLevel !== 'Safe' && (
              <button
                onClick={() => openQuickAction(selectedStudent)}
                className="px-4 py-2.5 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 font-semibold rounded-xl text-xs transition-all flex items-center gap-2 shadow-sm"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Intervene Now</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main 5 Metric KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Class Rank"
          value={`#${selectedStudent.rank || 1}`}
          subtitle={`Top ${Math.round(((selectedStudent.rank || 1)/25)*100)}% of Class`}
          icon={Award}
          variant="amber"
        />

        <KpiCard
          title="Cumulative Avg"
          value={`${selectedStudent.average}%`}
          subtitle="Across 5 Subjects"
          icon={GraduationCap}
          variant="blue"
          trend={`${selectedStudent.average >= 75 ? '+3.4%' : '-2.1%'}`}
          trendType={selectedStudent.average >= 75 ? 'up' : 'down'}
        />

        <KpiCard
          title="Total Marks"
          value={`${selectedStudent.totalMarks}/500`}
          subtitle="Raw Scaled Score"
          icon={BookOpen}
          variant="violet"
        />

        <KpiCard
          title="Letter Grade"
          value={`Grade ${selectedStudent.grade}`}
          subtitle={selectedStudent.grade === 'A+' ? 'Distinction' : selectedStudent.grade === 'F' ? 'Remedial' : 'Passing'}
          icon={CheckCircle}
          variant="emerald"
        />

        <KpiCard
          title="Attendance"
          value={`${selectedStudent.attendance}%`}
          subtitle={selectedStudent.attendance >= 75 ? 'Meets Threshold' : 'Critical Deficit'}
          icon={CalendarCheck}
          variant={selectedStudent.attendance >= 75 ? 'cyan' : 'rose'}
          trendType={selectedStudent.attendance >= 75 ? 'up' : 'down'}
        />
      </div>

      {/* Middle Row: Performance Trajectory & Subject Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trend */}
        <div className="lg:col-span-2 bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Academic Trajectory over Assessment Terms
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluation history compared against class 70% passing baseline
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              Latest: {historicalData[historicalData.length - 1].score}%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} domain={[30, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val, name) => [`${val}%`, name === 'score' ? 'Student Mark' : 'Benchmark']}
                />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#475569"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#FFFFFF' }}
                  activeDot={{ r: 6, fill: '#60A5FA' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competency Radar */}
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              Skill & Subject Radar
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Multidimensional competency balance
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={subjectScoresData}>
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                <Radar
                  name="Student Score"
                  dataKey="score"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.4}
                />
                <Tooltip contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '10px', fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center text-[11px] text-slate-400">
            Weakest Area: <span className="font-bold text-amber-400">{selectedStudent.weakestSubject}</span>
          </div>
        </div>
      </div>

      {/* Row 3: Subject Breakdown Cards & Attendance Gauge & AI Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Breakdown Detailed Bars */}
        <div className="lg:col-span-2 bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white tracking-tight mb-1">
            Subject Mark Breakdown (Out of 100)
          </h3>
          <p className="text-xs text-slate-400 mb-5">
            Individual course scores and faculty instructors
          </p>

          <div className="space-y-4">
            {subjectScoresData.map((item) => {
              const pct = item.score;
              return (
                <div key={item.subject} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">{item.subject}</span>
                      <span className="text-slate-400 ml-2 font-normal">({item.faculty})</span>
                    </div>
                    <span className="font-mono font-bold text-slate-200">
                      {item.score} / 100
                    </span>
                  </div>

                  <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct >= 85 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                        pct >= 70 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                        pct >= 50 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                        'bg-gradient-to-r from-rose-500 to-red-600'
                      }`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attendance Gauge & NEXORA AI Recommendation */}
        <div className="space-y-6">
          {/* Attendance Gauge Card */}
          <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance Status</div>
              <div className="text-2xl font-extrabold text-white mt-1">{selectedStudent.attendance}%</div>
              <div className="text-[11px] text-slate-400 mt-1">
                {selectedStudent.attendance >= 75 ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> Eligible for Finals
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> Below 75% Mandatory
                  </span>
                )}
              </div>
            </div>

            {/* Circular Gauge */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#1E293B"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke={selectedStudent.attendance >= 80 ? '#10B981' : selectedStudent.attendance >= 75 ? '#3B82F6' : '#F43F5E'}
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 32}
                  strokeDashoffset={2 * Math.PI * 32 - (selectedStudent.attendance / 100) * (2 * Math.PI * 32)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="absolute text-xs font-bold text-white font-mono">
                {selectedStudent.attendance}%
              </span>
            </div>
          </div>

          {/* NEXORA AI Recommendation Engine Box */}
          <div className="bg-gradient-to-br from-[#11162B] to-[#16122D] border border-blue-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">
                NEXORA AI Recommendation
              </h4>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-medium mt-2">
              "{selectedStudent.recommendation}"
            </p>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Confidence: 96.8%</span>
              <span className="text-blue-400 font-mono font-medium">Rule Engine: v2.4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
