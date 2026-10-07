import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BrainCircuit, 
  BarChart3, 
  CalendarCheck2, 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ChevronRight,
  Layers,
  Zap,
  Award,
  Terminal
} from 'lucide-react';
import NexoraLogo from '../components/common/NexoraLogo';
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

export default function LandingPage() {
  const { setCurrentPage, loginAsDemo } = useStudents();

  const previewTrendData = [
    { name: 'Mid 1', avg: 64, attendance: 80 },
    { name: 'Mid 2', avg: 67, attendance: 82 },
    { name: 'Quiz', avg: 71, attendance: 85 },
    { name: 'Lab 1', avg: 69, attendance: 81 },
    { name: 'Lab 2', avg: 74, attendance: 84 },
    { name: 'Final', avg: 76, attendance: 86 },
  ];

  const previewSubjectData = [
    { subject: 'Python', score: 82, fill: '#38BDF8' },
    { subject: 'AI', score: 76, fill: '#818CF8' },
    { subject: 'SQL', score: 84, fill: '#A855F7' },
    { subject: 'Maths', score: 73, fill: '#34D399' },
    { subject: 'Networks', score: 68, fill: '#F59E0B' },
  ];

  const previewGradeData = [
    { name: 'A+', value: 4, color: '#10B981' },
    { name: 'A', value: 7, color: '#3B82F6' },
    { name: 'B', value: 8, color: '#8B5CF6' },
    { name: 'C', value: 3, color: '#F59E0B' },
    { name: 'F', value: 3, color: '#F43F5E' },
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 relative overflow-hidden">
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-blue-600/20 via-violet-600/10 to-transparent blur-3xl pointer-events-none"></div>
      <div className="absolute top-[600px] right-0 w-[500px] h-[500px] bg-purple-600/10 blur-3xl pointer-events-none"></div>

      {/* Navigation Header */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <NexoraLogo size="large" />
        
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
          <a href="#why-nexora" className="hover:text-white transition-colors">Why NEXORA</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#analytics-preview" className="hover:text-white transition-colors">Platform Preview</a>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-400 font-mono">
            PYTHON • NUMPY • PANDAS
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('login')}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={loginAsDemo}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5 group"
          >
            <span>Explore Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 text-xs font-medium mb-8 backdrop-blur-md shadow-inner">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-blue-300 font-semibold">NEXORA 2.4</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Next-Gen Student Performance Analytics</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Turn Student Data Into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 glow-text-blue">
            Meaningful Insights.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Analyze academic performance, attendance, subject trends, and student progress through one intelligent data analytics platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={loginAsDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
          >
            <span>Explore Dashboard</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => setCurrentPage('login')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm transition-all backdrop-blur-sm"
          >
            View Demo Login
          </button>
        </div>

        {/* Hero Visual: Premium Floating Analytics Dashboard Preview */}
        <div className="relative mx-auto max-w-5xl">
          {/* Outer Glow Halo */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          {/* Main Card Container */}
          <div className="relative bg-[#0C1222]/90 backdrop-blur-2xl border border-slate-700/70 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-3 text-xs font-mono text-slate-400">nexora.analytics/live-cohort</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Intelligence Feed</span>
              </div>
            </div>

            {/* Quick KPI Preview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#0F172A]/80 border border-slate-800 rounded-2xl p-4 text-left">
                <div className="text-[11px] font-semibold text-slate-400 uppercase">Class Average</div>
                <div className="text-2xl font-bold text-white mt-1">68.7%</div>
                <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +4.8% vs last term
                </div>
              </div>

              <div className="bg-[#0F172A]/80 border border-slate-800 rounded-2xl p-4 text-left">
                <div className="text-[11px] font-semibold text-slate-400 uppercase">Pass Rate</div>
                <div className="text-2xl font-bold text-white mt-1">84.0%</div>
                <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> 21 of 25 passed
                </div>
              </div>

              <div className="bg-[#0F172A]/80 border border-slate-800 rounded-2xl p-4 text-left">
                <div className="text-[11px] font-semibold text-slate-400 uppercase">Top Performer</div>
                <div className="text-xl font-bold text-amber-300 mt-1 truncate">Aarav Sharma</div>
                <div className="text-[10px] text-slate-400 mt-1">95.0% (Grade A+)</div>
              </div>

              <div className="bg-[#0F172A]/80 border border-slate-800 rounded-2xl p-4 text-left">
                <div className="text-[11px] font-semibold text-rose-400 uppercase">At-Risk Students</div>
                <div className="text-2xl font-bold text-rose-400 mt-1">4</div>
                <div className="text-[10px] text-rose-300/80 mt-1">Action needed</div>
              </div>
            </div>

            {/* Visual Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Performance Trend Area */}
              <div className="md:col-span-2 bg-[#0F172A]/50 border border-slate-800/80 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">Cohort Performance Trajectory</h4>
                    <p className="text-[10px] text-slate-400">Class average across assessments</p>
                  </div>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-mono">
                    Semester 6
                  </span>
                </div>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={previewTrendData}>
                      <defs>
                        <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} />
                      <YAxis stroke="#64748B" fontSize={10} domain={[50, 100]} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                      />
                      <Area type="monotone" dataKey="avg" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#heroGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Grade Breakdown Donut */}
              <div className="bg-[#0F172A]/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Grade Distribution</h4>
                  <p className="text-[10px] text-slate-400">Relative percentiles</p>
                </div>
                <div className="h-32 w-full my-auto flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={previewGradeData}
                        innerRadius={30}
                        outerRadius={48}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {previewGradeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-3 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> A+/A</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> B</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Why NEXORA? */}
      <section id="why-nexora" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
            Why NEXORA?
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Data-Driven Academic Decisions
          </h3>
          <p className="text-slate-400 text-sm mt-3">
            Replace static spreadsheets with an active intelligence engine built on Python statistical frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0F172A]/70 border border-slate-800/80 rounded-2xl p-6 hover:border-blue-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Performance Intelligence</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Understand cohort progress instantly with mean, median, standard deviation, and historical assessment trends.
            </p>
          </div>

          <div className="bg-[#0F172A]/70 border border-slate-800/80 rounded-2xl p-6 hover:border-purple-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Subject Analytics</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discover strong and weak academic areas across Python, AI, SQL, Mathematics, and Computer Networks.
            </p>
          </div>

          <div className="bg-[#0F172A]/70 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <CalendarCheck2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Attendance Insights</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Identify attendance patterns, absenteeism correlation with test marks, and students below the 75% threshold.
            </p>
          </div>

          <div className="bg-[#0F172A]/70 border border-slate-800/80 rounded-2xl p-6 hover:border-rose-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Actionable Recommendations</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Highlight students requiring urgent intervention with automated faculty remedial suggestions.
            </p>
          </div>
        </div>
      </section>

      {/* Section: How NEXORA Works (4-step process) */}
      <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
            System Workflow
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How NEXORA Transforms Data
          </h3>
          <p className="text-slate-400 text-sm mt-3">
            An end-to-end analytical pipeline designed for academic precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative bg-[#0F172A]/60 border border-slate-800 p-6 rounded-2xl">
            <div className="text-3xl font-mono font-extrabold text-blue-500/30 mb-3">01</div>
            <h4 className="text-base font-bold text-white mb-1">Collect</h4>
            <p className="text-xs text-slate-400">
              Gather marks, attendance logs, and student records across departments.
            </p>
          </div>

          <div className="relative bg-[#0F172A]/60 border border-slate-800 p-6 rounded-2xl">
            <div className="text-3xl font-mono font-extrabold text-indigo-500/30 mb-3">02</div>
            <h4 className="text-base font-bold text-white mb-1">Analyze</h4>
            <p className="text-xs text-slate-400">
              Process statistical distributions using Python, NumPy, and Pandas models.
            </p>
          </div>

          <div className="relative bg-[#0F172A]/60 border border-slate-800 p-6 rounded-2xl">
            <div className="text-3xl font-mono font-extrabold text-purple-500/30 mb-3">03</div>
            <h4 className="text-base font-bold text-white mb-1">Discover</h4>
            <p className="text-xs text-slate-400">
              Find academic trends, top performers, and at-risk early warning signals.
            </p>
          </div>

          <div className="relative bg-[#0F172A]/60 border border-slate-800 p-6 rounded-2xl">
            <div className="text-3xl font-mono font-extrabold text-cyan-500/30 mb-3">04</div>
            <h4 className="text-base font-bold text-white mb-1">Act</h4>
            <p className="text-xs text-slate-400">
              Deploy personalized remedial actions, mentoring, and administrative reports.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Analytics Preview */}
      <section id="analytics-preview" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <div className="bg-gradient-to-br from-[#0F172A] to-[#0A101D] border border-slate-800 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none"></div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Ready to understand your students better?
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
            Experience the complete student intelligence environment with 25 benchmark records, 360° profiles, and live report generation.
          </p>

          <button
            onClick={loginAsDemo}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-blue-500/20 transition-all inline-flex items-center gap-2 group"
          >
            <span>Enter NEXORA</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070913] py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <NexoraLogo size="small" />
          <p>NEXORA — Next-Generation Student Performance Analytics System</p>
          <div className="text-[11px] font-mono text-slate-400">
            PYTHON • NUMPY • PANDAS
          </div>
        </div>
      </footer>
    </div>
  );
}
