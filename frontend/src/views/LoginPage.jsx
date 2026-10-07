import React, { useState } from 'react';
import NexoraLogo from '../components/common/NexoraLogo';
import { useStudents } from '../context/StudentContext';
import { Lock, Mail, ArrowRight, Sparkles, Shield, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const { loginAsDemo, loginUser, setCurrentPage } = useStudents();
  const [email, setEmail] = useState('admin@nexora.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSignIn = (e) => {
    e.preventDefault();
    loginUser(email || 'admin@nexora.edu', password);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col justify-center relative overflow-hidden p-4 sm:p-6">
      {/* Background glow mesh */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 bg-[#0B0F19]/90 border border-slate-800/90 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl">
        {/* Left Side: Brand Story & Analytics Accent */}
        <div className="p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-[#0F172A] via-[#0A1124] to-[#080C16] border-b lg:border-b-0 lg:border-r border-slate-800 relative">
          <div className="absolute inset-0 bg-radial-gradient-glow opacity-60 pointer-events-none"></div>

          <div>
            <div className="cursor-pointer" onClick={() => setCurrentPage('landing')}>
              <NexoraLogo size="large" />
            </div>

            <div className="mt-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Analytics Engine</span>
              </div>

              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
                Your academic intelligence starts here.
              </h2>

              <p className="text-sm text-slate-400 leading-relaxed">
                Transform student records, subject assessments, and attendance into instant actionable insights for faculties and academic councils.
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-10 space-y-3 pt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Real-time Python & Pandas statistical metrics</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>Automated at-risk student intervention alerts</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>360° individual student diagnostic profiles</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-[#0C1222]/80">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Sign In to NEXORA
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your academic credentials or use instant demo mode.
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Academic Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="coordinator@nexora.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Use 'Continue as Demo' for instant access!"); }} className="text-xs text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0"
                  />
                  <span>Remember my session for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#0C1222] text-slate-500 uppercase tracking-wider font-mono">
                  Or One-Click Access
                </span>
              </div>
            </div>

            {/* Instant Demo Access Button */}
            <button
              type="button"
              onClick={loginAsDemo}
              className="w-full py-3 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-blue-500/50 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 group shadow-md"
            >
              <Shield className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Continue as Demo (Coordinator)</span>
            </button>

            <div className="text-center">
              <button
                onClick={() => setCurrentPage('landing')}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                ← Back to Welcome Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
