import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useStudents } from '../../context/StudentContext';
import { Plus, Check, AlertCircle } from 'lucide-react';

export default function AddStudentModal({ isOpen, onClose }) {
  const { handleAddStudent } = useStudents();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'CSE AI/ML',
    semester: 'Semester 4',
    attendance: 85,
    scores: {
      python: 75,
      ai: 70,
      sql: 78,
      mathematics: 72,
      networks: 74
    },
    notes: ''
  });

  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScoreChange = (subject, value) => {
    const num = Math.min(100, Math.max(0, Number(value) || 0));
    setFormData(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        [subject]: num
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Student name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Student email is required');
      return;
    }

    handleAddStudent(formData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      email: '',
      department: 'CSE AI/ML',
      semester: 'Semester 4',
      attendance: 85,
      scores: {
        python: 75,
        ai: 70,
        sql: 78,
        mathematics: 72,
        networks: 74
      },
      notes: ''
    });
    setError('');
  };

  const calculatePreviewAvg = () => {
    const vals = Object.values(formData.scores);
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enroll New Student"
      subtitle="Enter student profile, marks, and attendance to compute performance metrics."
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Siddharth Verma"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Institutional Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. siddharth.v@nexora.edu"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Department & Semester */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Department
            </label>
            <select
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="CSE AI/ML">CSE AI/ML</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Semester
            </label>
            <select
              value={formData.semester}
              onChange={(e) => handleChange('semester', e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Semester 4">Semester 4</option>
              <option value="Semester 6">Semester 6</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Attendance % ({formData.attendance}%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.attendance}
              onChange={(e) => handleChange('attendance', Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Subject Scores */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Subject Marks (out of 100)
            </span>
            <span className="text-xs text-blue-400 font-mono font-semibold">
              Computed Avg: {calculatePreviewAvg()}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Python</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.scores.python}
                onChange={(e) => handleScoreChange('python', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">AI</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.scores.ai}
                onChange={(e) => handleScoreChange('ai', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">SQL</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.scores.sql}
                onChange={(e) => handleScoreChange('sql', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Mathematics</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.scores.mathematics}
                onChange={(e) => handleScoreChange('mathematics', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Networks</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.scores.networks}
                onChange={(e) => handleScoreChange('networks', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Academic Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Faculty Notes / Observations (Optional)
          </label>
          <textarea
            rows="2"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Special strengths, project contributions, or areas needing attention..."
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
          ></textarea>
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
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add Student Record
          </button>
        </div>
      </form>
    </Modal>
  );
}
