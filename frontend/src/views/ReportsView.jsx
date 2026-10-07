import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  Calendar, 
  ShieldAlert, 
  Trophy, 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function ReportsView() {
  const { analytics, openExport, addToast } = useStudents();

  const reportTemplates = [
    {
      id: 'all',
      title: 'Academic Performance Comprehensive Report',
      description: 'Complete cohort analysis including mean, median, standard deviation, pass rate, and full student marksheet.',
      icon: TrendingUp,
      color: 'blue',
      badge: 'Full Cohort',
      fileSize: '~1.2 MB'
    },
    {
      id: 'at-risk',
      title: 'At-Risk Students Intervention Report',
      description: 'Categorized list of Critical and High-risk students, root causes, weakest subject diagnostics, and faculty action plans.',
      icon: ShieldAlert,
      color: 'rose',
      badge: 'Intervention',
      fileSize: '~650 KB'
    },
    {
      id: 'top',
      title: 'Honor Roll & Top Performers Dossier',
      description: 'Dean’s list rankings, department toppers, subject toppers, and distinguished students summary.',
      icon: Trophy,
      color: 'amber',
      badge: 'Honor Roll',
      fileSize: '~420 KB'
    },
    {
      id: 'attendance',
      title: 'Regulatory Attendance & Shortage Report',
      description: 'Regulatory compliance ledger with students below the 75% cutoff and attendance vs GPA correlation analytics.',
      icon: Calendar,
      color: 'violet',
      badge: 'Attendance',
      fileSize: '~580 KB'
    },
    {
      id: 'subjects',
      title: 'Subject Diagnostics & Faculty Benchmark',
      description: 'Departmental curriculum evaluation across Python, AI, SQL, Mathematics, and Computer Networks.',
      icon: BookOpen,
      color: 'cyan',
      badge: 'Curriculum',
      fileSize: '~890 KB'
    }
  ];

  const recentReports = [
    {
      name: 'NEXORA_Comprehensive_MidTerm_Report.pdf',
      type: 'PDF Document',
      generated: '10 minutes ago',
      size: '1.2 MB',
      status: 'Ready'
    },
    {
      name: 'NEXORA_At_Risk_Intervention_List.csv',
      type: 'CSV Spreadsheet',
      generated: '1 hour ago',
      size: '240 KB',
      status: 'Ready'
    },
    {
      name: 'NEXORA_Attendance_Deficit_Notice.pdf',
      type: 'PDF Document',
      generated: 'Yesterday at 4:30 PM',
      size: '580 KB',
      status: 'Archived'
    },
    {
      name: 'NEXORA_Top_Performers_Honor_Roll.pdf',
      type: 'PDF Document',
      generated: '2 days ago',
      size: '420 KB',
      status: 'Archived'
    }
  ];

  const handleDownloadRecent = (fileName) => {
    openExport('all');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reports & Academic Insights
            </h1>
            <span className="text-xs font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-bold">
              Automated PDF & CSV Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generate printable PDF executive dossiers and structured CSV data sheets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openExport('all')}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Generate Custom Report</span>
          </button>
        </div>
      </div>

      {/* Report Generator Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTemplates.map((template) => {
          const Icon = template.icon;
          const colorStyles = {
            blue: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
            rose: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
            amber: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
            violet: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
            cyan: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
          };

          const style = colorStyles[template.color] || colorStyles.blue;

          return (
            <div
              key={template.id}
              className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 hover:border-blue-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl border ${style} transition-transform group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    {template.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors">
                  {template.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {template.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  Est. {template.fileSize}
                </span>

                <button
                  onClick={() => openExport(template.id)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-blue-600 hover:text-white border border-slate-700 hover:border-blue-500 text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Generated Reports Table */}
      <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Recent Generated Reports Archive</h3>
          </div>
          <span className="text-xs text-slate-400">Saved in cache</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Document File Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Generated Time</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {recentReports.map((report, idx) => (
                <tr key={idx} className="hover:bg-blue-600/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      {report.type.includes('PDF') ? (
                        <FileText className="w-4 h-4 text-rose-400" />
                      ) : (
                        <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                      )}
                      <span className="font-semibold text-white font-mono text-xs">
                        {report.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-slate-400">
                    {report.type}
                  </td>

                  <td className="py-3 px-4 text-slate-300">
                    {report.generated}
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-400">
                    {report.size}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDownloadRecent(report.name)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 text-xs font-medium transition-all inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3 text-blue-400" />
                      <span>Download</span>
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
