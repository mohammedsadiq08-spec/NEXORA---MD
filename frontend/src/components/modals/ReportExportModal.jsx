import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useStudents } from '../../context/StudentContext';
import { FileText, Download, CheckCircle, FileSpreadsheet, Eye, Sparkles } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ReportExportModal({ isOpen, onClose, defaultType = 'all' }) {
  const { analytics, addToast } = useStudents();
  const [reportType, setReportType] = useState(defaultType);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [includeHistorical, setIncludeHistorical] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!analytics) return null;

  const handleExportCSV = () => {
    let targetStudents = [...analytics.students];
    let filename = `NEXORA_Student_Report_${new Date().toISOString().slice(0, 10)}.csv`;

    if (reportType === 'at-risk') {
      targetStudents = targetStudents.filter(s => s.riskLevel === 'Critical' || s.riskLevel === 'High');
      filename = `NEXORA_At_Risk_Students_${new Date().toISOString().slice(0, 10)}.csv`;
    } else if (reportType === 'top') {
      targetStudents = targetStudents.slice(0, 5);
      filename = `NEXORA_Top_Performers_${new Date().toISOString().slice(0, 10)}.csv`;
    }

    const headers = ["Student ID", "Name", "Department", "Semester", "Python", "AI", "SQL", "Mathematics", "Networks", "Average", "Attendance", "Grade", "Status", "Risk Level", "Recommendation"];
    
    const rows = targetStudents.map(s => [
      `"${s.id}"`,
      `"${s.name}"`,
      `"${s.department}"`,
      `"${s.semester}"`,
      s.scores.python,
      s.scores.ai,
      s.scores.sql,
      s.scores.mathematics,
      s.scores.networks,
      s.average,
      `${s.attendance}%`,
      `"${s.grade}"`,
      `"${s.status}"`,
      `"${s.riskLevel}"`,
      `"${s.recommendation.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast("Export Successful", `Downloaded CSV file: ${filename}`, "success");
    onClose();
  };

  const handleExportPDF = () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF();
      let targetStudents = [...analytics.students];
      let title = "NEXORA Academic Performance & Intelligence Report";

      if (reportType === 'at-risk') {
        targetStudents = targetStudents.filter(s => s.riskLevel === 'Critical' || s.riskLevel === 'High');
        title = "NEXORA At-Risk Students Intervention Report";
      } else if (reportType === 'top') {
        targetStudents = targetStudents.slice(0, 5);
        title = "NEXORA Academic Honor Roll & Top Performers";
      }

      // Title & Header Banner
      doc.setFillColor(7, 9, 19);
      doc.rect(0, 0, 210, 32, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text("NEXORA Analytics Intelligence", 14, 15);

      doc.setFontSize(9);
      doc.setTextColor(147, 197, 253);
      doc.text("Next-Generation Student Performance Analytics System", 14, 22);
      
      doc.setFontSize(8);
      doc.setTextColor(203, 213, 225);
      doc.text(`Generated on: ${new Date().toLocaleString()} | Total Cohort: ${analytics.totalCount} Students`, 14, 28);

      // Section Title
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(13);
      doc.text(title, 14, 42);

      // Summary KPIs Box
      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 46, 182, 20, 2, 2, 'FD');

      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text(`Class Average: ${analytics.classAverage}%`, 18, 54);
      doc.text(`Pass Rate: ${analytics.passRate}%`, 65, 54);
      doc.text(`Avg Attendance: ${analytics.averageAttendance}%`, 110, 54);
      doc.text(`At-Risk: ${analytics.atRiskCount} Students`, 155, 54);

      doc.text(`Top Subject: ${analytics.bestSubject.name} (${analytics.bestSubject.average}%)`, 18, 62);
      doc.text(`Std Deviation: ${analytics.stdDev}`, 110, 62);

      // Table
      const tableData = targetStudents.map(s => [
        s.id,
        s.name,
        s.department,
        `${s.average}%`,
        `${s.attendance}%`,
        s.grade,
        s.riskLevel,
        s.weakestSubject
      ]);

      doc.autoTable({
        startY: 72,
        head: [['Roll No', 'Name', 'Department', 'Average', 'Attendance', 'Grade', 'Risk', 'Focus Area']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold' },
        styles: { fontSize: 8, cellPadding: 2.5 },
        alternateRowStyles: { fillColor: [241, 245, 249] }
      });

      // Recommendations summary if enabled
      if (includeRecommendations && reportType === 'at-risk') {
        const finalY = doc.lastAutoTable.finalY + 10;
        if (finalY < 260) {
          doc.setFontSize(11);
          doc.setTextColor(15, 23, 42);
          doc.text("Recommended Interventions & Faculty Directives", 14, finalY);
          
          let curY = finalY + 6;
          targetStudents.slice(0, 4).forEach((s, idx) => {
            doc.setFontSize(8);
            doc.setTextColor(71, 85, 105);
            doc.text(`${idx + 1}. ${s.name} (${s.id}): ${s.recommendation}`, 14, curY, { maxWidth: 180 });
            curY += 8;
          });
        }
      }

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(`NEXORA Intelligence Suite — Confidential Academic Document — Page ${i} of ${pageCount}`, 14, 290);
      }

      doc.save(`NEXORA_Academic_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
      addToast("Export Successful", "Downloaded comprehensive PDF report with auto-calculated analytics.", "success");
      onClose();
    } catch (err) {
      console.error(err);
      addToast("Export Error", "Failed to compile PDF document.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate & Export Intelligence Report"
      subtitle="Export processed student metrics, subject distributions, and AI recommendations."
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Report Scope Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Select Report Scope
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setReportType('all')}
              className={`p-3 rounded-xl border text-left transition-all ${
                reportType === 'all'
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-bold mb-0.5">Comprehensive</div>
              <div className="text-[10px] text-slate-400">All {analytics.totalCount} students</div>
            </button>

            <button
              type="button"
              onClick={() => setReportType('at-risk')}
              className={`p-3 rounded-xl border text-left transition-all ${
                reportType === 'at-risk'
                  ? 'bg-rose-600/20 border-rose-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-bold text-rose-400 mb-0.5">At-Risk Cohort</div>
              <div className="text-[10px] text-slate-400">{analytics.atRiskCount} flagged students</div>
            </button>

            <button
              type="button"
              onClick={() => setReportType('top')}
              className={`p-3 rounded-xl border text-left transition-all ${
                reportType === 'top'
                  ? 'bg-amber-600/20 border-amber-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-bold text-amber-400 mb-0.5">Top Performers</div>
              <div className="text-[10px] text-slate-400">Honor Roll Top 5</div>
            </button>
          </div>
        </div>

        {/* Report Options */}
        <div className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2">
          <div className="text-xs font-semibold text-slate-300 mb-2">Report Content Options</div>
          
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeRecommendations}
              onChange={(e) => setIncludeRecommendations(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0"
            />
            <span>Include AI Intervention Recommendations</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeHistorical}
              onChange={(e) => setIncludeHistorical(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0"
            />
            <span>Include Statistical Variance & Department Breakdown</span>
          </label>
        </div>

        {/* Live Preview Summary */}
        <div className="p-3 bg-blue-950/30 border border-blue-900/40 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-blue-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Ready to render formatted vector PDF or CSV sheet</span>
          </div>
          <span className="font-mono text-cyan-400 font-semibold text-[11px]">
            {analytics.totalCount} Records
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            Export CSV
          </button>

          <button
            type="button"
            disabled={isGenerating}
            onClick={handleExportPDF}
            className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Export PDF'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
