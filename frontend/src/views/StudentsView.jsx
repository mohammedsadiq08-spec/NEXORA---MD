import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  Download, 
  ArrowUpDown, 
  Eye, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import RiskBadge from '../components/common/RiskBadge';
import EmptyState from '../components/common/EmptyState';
import { useStudents } from '../context/StudentContext';
import { DEPARTMENTS, SEMESTERS } from '../data/mockData';

export default function StudentsView() {
  const { 
    filteredStudents, 
    rawStudents,
    searchQuery, 
    setSearchQuery,
    departmentFilter, 
    setDepartmentFilter,
    semesterFilter, 
    setSemesterFilter,
    performanceFilter, 
    setPerformanceFilter,
    navigateToStudent,
    setIsAddStudentOpen,
    openExport,
    openQuickAction
  } = useStudents();

  const [sortField, setSortField] = useState('average');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 10;

  // Sorting
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (sortField === 'id') {
      return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    }
    
    // Numeric
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Pagination
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
  const paginatedStudents = sortedStudents.slice(
    (currentPageNum - 1) * itemsPerPage,
    currentPageNum * itemsPerPage
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Students Roster
            </h1>
            <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
              {filteredStudents.length} of {rawStudents.length} Enrolled
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            View and analyze individual student academic records, marks, and attendance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openExport('all')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export CSV / PDF</span>
          </button>

          <button
            onClick={() => setIsAddStudentOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPageNum(1);
            }}
            placeholder="Search by name, roll no, or department..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Department */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-400">Dept:</span>
            <select
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                setCurrentPageNum(1);
              }}
              className="bg-transparent text-xs text-white focus:outline-none font-medium cursor-pointer"
            >
              {DEPARTMENTS.map(d => (
                <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-400">Semester:</span>
            <select
              value={semesterFilter}
              onChange={(e) => {
                setSemesterFilter(e.target.value);
                setCurrentPageNum(1);
              }}
              className="bg-transparent text-xs text-white focus:outline-none font-medium cursor-pointer"
            >
              {SEMESTERS.map(s => (
                <option key={s} value={s} className="bg-slate-900 text-white">{s}</option>
              ))}
            </select>
          </div>

          {/* Performance Status */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-400">Status:</span>
            <select
              value={performanceFilter}
              onChange={(e) => {
                setPerformanceFilter(e.target.value);
                setCurrentPageNum(1);
              }}
              className="bg-transparent text-xs text-white focus:outline-none font-medium cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-white">All Tiers</option>
              <option value="Excellent" className="bg-slate-900 text-white">Excellent (≥85%)</option>
              <option value="Good" className="bg-slate-900 text-white">Good (70-84%)</option>
              <option value="Needs Improvement" className="bg-slate-900 text-white">Needs Improvement</option>
              <option value="At Risk" className="bg-slate-900 text-white">At Risk (&lt;55% or &lt;70% att)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          title="No students match the selected filters"
          description="Try broadening your department, semester, or search criteria."
          actionText="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setDepartmentFilter('All');
            setSemesterFilter('All');
            setPerformanceFilter('All');
          }}
        />
      ) : (
        <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('id')}>
                    <div className="flex items-center gap-1">
                      <span>Student ID</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">
                      <span>Student Name</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Semester</th>
                  <th className="py-3.5 px-4 cursor-pointer hover:text-white text-right" onClick={() => handleSort('average')}>
                    <div className="flex items-center justify-end gap-1">
                      <span>Average</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 cursor-pointer hover:text-white text-right" onClick={() => handleSort('attendance')}>
                    <div className="flex items-center justify-end gap-1">
                      <span>Attendance</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-center">Grade</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {paginatedStudents.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => navigateToStudent(student.id)}
                    className="hover:bg-blue-600/5 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono text-slate-400 font-semibold group-hover:text-blue-400">
                      {student.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                            {student.name}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      {student.department}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400">
                      {student.semester}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold">
                      <span className={`${
                        student.average >= 85 ? 'text-emerald-400' :
                        student.average < 55 ? 'text-rose-400' : 'text-slate-200'
                      }`}>
                        {student.average}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono">
                      <span className={`${
                        student.attendance < 75 ? 'text-amber-400 font-bold' : 'text-slate-300'
                      }`}>
                        {student.attendance}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded font-bold text-[11px] font-mono ${
                        student.grade === 'A+' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        student.grade === 'A' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        student.grade === 'B' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        student.grade === 'C' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {student.grade}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={student.status} size="small" />
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigateToStudent(student.id)}
                          className="p-1.5 text-slate-400 hover:text-blue-400 bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Open 360° Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {student.riskLevel !== 'Safe' && (
                          <button
                            onClick={() => openQuickAction(student)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors"
                            title="Intervention"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing <span className="font-semibold text-white">{(currentPageNum - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-semibold text-white">
                {Math.min(currentPageNum * itemsPerPage, sortedStudents.length)}
              </span> of <span className="font-semibold text-white">{sortedStudents.length}</span> students
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPageNum === 1}
                onClick={() => setCurrentPageNum(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-white transition-colors"
              >
                Previous
              </button>
              <span className="font-mono px-2 text-slate-300">
                {currentPageNum} / {totalPages || 1}
              </span>
              <button
                disabled={currentPageNum === totalPages || totalPages === 0}
                onClick={() => setCurrentPageNum(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 text-white transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
