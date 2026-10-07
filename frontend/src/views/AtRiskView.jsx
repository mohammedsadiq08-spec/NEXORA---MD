import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  AlertCircle, 
  ArrowUpRight, 
  Mail, 
  Calendar, 
  BookCheck, 
  Filter, 
  Download,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import EmptyState from '../components/common/EmptyState';
import { useStudents } from '../context/StudentContext';

export default function AtRiskView() {
  const { analytics, navigateToStudent, openQuickAction, openExport } = useStudents();
  const [riskTierFilter, setRiskTierFilter] = useState('All');

  if (!analytics) return null;

  const allRiskStudents = analytics.students.filter(s => s.riskLevel !== 'Safe');

  const filteredRiskStudents = allRiskStudents.filter(s => {
    if (riskTierFilter === 'All') return true;
    return s.riskLevel === riskTierFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Students Requiring Attention
            </h1>
            <span className="text-xs font-mono uppercase bg-rose-500/15 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-bold">
              Early Warning Radar
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            NEXORA identifies students who require immediate academic or attendance intervention.
          </p>
        </div>

        <button
          onClick={() => openExport('at-risk')}
          className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 font-semibold rounded-xl text-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Intervention List (PDF)</span>
        </button>
      </div>

      {/* 3 Risk Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Critical Risk */}
        <div 
          onClick={() => setRiskTierFilter(riskTierFilter === 'Critical' ? 'All' : 'Critical')}
          className={`bg-gradient-to-br from-[#1A0A10] to-[#0F172A] border rounded-2xl p-6 cursor-pointer transition-all ${
            riskTierFilter === 'Critical' ? 'border-rose-500 shadow-lg shadow-rose-500/20 ring-1 ring-rose-500' : 'border-rose-500/30 hover:border-rose-500/60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Critical Risk Tier
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{analytics.criticalCount}</div>
          <p className="text-xs text-slate-400 mt-1">
            Failing score (&lt;40) or severe attendance shortage (&lt;65%).
          </p>
        </div>

        {/* High Risk */}
        <div 
          onClick={() => setRiskTierFilter(riskTierFilter === 'High' ? 'All' : 'High')}
          className={`bg-gradient-to-br from-[#1A140A] to-[#0F172A] border rounded-2xl p-6 cursor-pointer transition-all ${
            riskTierFilter === 'High' ? 'border-amber-500 shadow-lg shadow-amber-500/20 ring-1 ring-amber-500' : 'border-amber-500/30 hover:border-amber-500/60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              High Risk Tier
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{analytics.highRiskCount}</div>
          <p className="text-xs text-slate-400 mt-1">
            GPA &lt; 60% with borderline attendance under 75%.
          </p>
        </div>

        {/* Moderate Risk */}
        <div 
          onClick={() => setRiskTierFilter(riskTierFilter === 'Moderate' ? 'All' : 'Moderate')}
          className={`bg-gradient-to-br from-[#101026] to-[#0F172A] border rounded-2xl p-6 cursor-pointer transition-all ${
            riskTierFilter === 'Moderate' ? 'border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500' : 'border-indigo-500/30 hover:border-indigo-500/60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <AlertCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Moderate Risk Tier
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{analytics.moderateRiskCount}</div>
          <p className="text-xs text-slate-400 mt-1">
            Subject performance dip or declining test trend.
          </p>
        </div>
      </div>

      {/* Intervention Table */}
      {filteredRiskStudents.length === 0 ? (
        <EmptyState
          title="No students currently in this risk tier"
          description="Great job! The selected tier has no flagged students."
          actionText="Show All At-Risk Students"
          onAction={() => setRiskTierFilter('All')}
        />
      ) : (
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Flagged Students Matrix ({filteredRiskStudents.length} Students)
              </h3>
              {riskTierFilter !== 'All' && (
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">
                  Filtered by: {riskTierFilter}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setRiskTierFilter('All')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                  riskTierFilter === 'All' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Risks
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-3 text-center">Avg GPA</th>
                  <th className="py-3.5 px-3 text-center">Attendance</th>
                  <th className="py-3.5 px-4">Weak Subject</th>
                  <th className="py-3.5 px-4">Risk Level</th>
                  <th className="py-3.5 px-4">Diagnostic Reason</th>
                  <th className="py-3.5 px-4">Recommended Action</th>
                  <th className="py-3.5 px-4 text-right">Intervene</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredRiskStudents.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => navigateToStudent(student.id)}
                    className="hover:bg-rose-500/5 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-rose-500/30"
                        />
                        <div>
                          <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                            {student.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {student.id} • {student.department}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono font-bold text-rose-400">
                      {student.average}%
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono font-bold text-amber-400">
                      {student.attendance}%
                    </td>

                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {student.weakestSubject}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <RiskBadge level={student.riskLevel} size="small" />
                    </td>

                    <td className="py-3.5 px-4 text-slate-300 max-w-xs">
                      <span className="text-[11px] leading-snug block">
                        {student.riskReason}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 max-w-xs">
                      <span className="text-[11px] leading-snug block text-slate-300 italic">
                        "{student.recommendation}"
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openQuickAction(student)}
                        className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 font-semibold rounded-lg text-xs transition-all flex items-center gap-1.5 ml-auto shadow-sm"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>Action</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
