import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Palette, 
  Bell, 
  Sliders, 
  Database, 
  RotateCcw, 
  Save, 
  CheckCircle,
  Shield,
  Sparkles,
  Download
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function SettingsView() {
  const { userRole, handleResetData, addToast, rawStudents } = useStudents();

  const [settings, setSettings] = useState({
    name: userRole.name,
    role: userRole.role,
    email: 'evelyn.vance@nexora.edu',
    department: 'All Engineering Disciplines',
    criticalRiskThreshold: 50,
    attendanceThreshold: 75,
    emailAlerts: true,
    weeklyDigest: true,
    realtimeSync: true,
    glassmorphism: true,
    defaultTimeframe: 'Semester'
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Settings Saved', 'System preferences and diagnostic thresholds updated.', 'success');
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rawStudents, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `NEXORA_Raw_Dataset_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Export Complete', 'Downloaded raw student dataset as JSON.', 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Settings & Analytics Preferences
            </h1>
            <span className="text-xs font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-bold">
              Admin Configuration
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure risk tolerance parameters, academic coordinator profile, and data persistence.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Coordinator Profile</h3>
              <p className="text-xs text-slate-400">Personal details and administrative clearance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Role Title</label>
              <input
                type="text"
                value={settings.role}
                onChange={(e) => setSettings({ ...settings, role: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Official Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Scope / Department</label>
              <input
                type="text"
                value={settings.department}
                disabled
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-xs text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Diagnostic Thresholds (NumPy & Risk Rules) */}
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Academic Risk Thresholds</h3>
              <p className="text-xs text-slate-400">Trigger benchmarks for automated student intervention flagging</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2 text-xs">
                <label className="font-semibold text-slate-300">Passing GPA Cutoff</label>
                <span className="font-mono text-blue-400 font-bold">{settings.criticalRiskThreshold}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="65"
                value={settings.criticalRiskThreshold}
                onChange={(e) => setSettings({ ...settings, criticalRiskThreshold: Number(e.target.value) })}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 mt-1">Students below this average are flagged as Critical Risk.</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 text-xs">
                <label className="font-semibold text-slate-300">Mandatory Attendance Minimum</label>
                <span className="font-mono text-emerald-400 font-bold">{settings.attendanceThreshold}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="85"
                value={settings.attendanceThreshold}
                onChange={(e) => setSettings({ ...settings, attendanceThreshold: Number(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 mt-1">University regulatory threshold for exam eligibility.</p>
            </div>
          </div>
        </div>

        {/* Notifications & Alert Preferences */}
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Notification Channels</h3>
              <p className="text-xs text-slate-400">Configure delivery preferences for early warning indicators</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div>
                <div className="text-xs font-semibold text-white">Instant Critical Risk Notifications</div>
                <div className="text-[10px] text-slate-400">Receive immediate banner alert when any student falls below 40 marks</div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div>
                <div className="text-xs font-semibold text-white">Weekly Attendance Deficit Digest</div>
                <div className="text-[10px] text-slate-400">Automated summary of students below 75% attendance compiled every Monday</div>
              </div>
              <input
                type="checkbox"
                checked={settings.weeklyDigest}
                onChange={(e) => setSettings({ ...settings, weeklyDigest: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0"
              />
            </label>
          </div>
        </div>

        {/* Data Management & Mock Controls */}
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Data Management</h3>
              <p className="text-xs text-slate-400">Manage sample benchmark datasets, backup, and restore</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleExportJSON}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-white transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Backup Dataset as JSON</span>
            </button>

            <button
              type="button"
              onClick={handleResetData}
              className="px-4 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 rounded-xl text-xs font-semibold text-rose-300 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore 25 Initial Benchmark Records</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
