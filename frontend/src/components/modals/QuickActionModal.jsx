import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useStudents } from '../../context/StudentContext';
import { Mail, Calendar, BookCheck, ShieldAlert, CheckCircle } from 'lucide-react';

export default function QuickActionModal({ isOpen, onClose, student }) {
  const { addToast } = useStudents();
  const [actionType, setActionType] = useState('schedule');
  const [notes, setNotes] = useState('');

  if (!student) return null;

  const handleExecute = (e) => {
    e.preventDefault();
    let actionDesc = "Mentoring session scheduled";
    if (actionType === 'email') actionDesc = "Attendance & performance warning email dispatched";
    else if (actionType === 'remedial') actionDesc = `Assigned remedial workshop in ${student.weakestSubject}`;
    else if (actionType === 'parent') actionDesc = "Parent-teacher consultation request logged";

    addToast("Intervention Recorded", `${actionDesc} for ${student.name} (${student.id}).`, "success");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Intervention Action: ${student.name}`}
      subtitle={`Student ID: ${student.id} • Risk Level: ${student.riskLevel} • Focus: ${student.weakestSubject}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleExecute} className="space-y-4">
        {/* Student summary banner */}
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-rose-300">
              Primary Concern: {student.riskReason}
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              Attendance: {student.attendance}% | Current GPA: {student.average}%
            </div>
          </div>
          <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2 py-1 rounded-md">
            {student.riskLevel}
          </span>
        </div>

        {/* Action Type Select */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Select Intervention Protocol
          </label>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              actionType === 'schedule' ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <input
                type="radio"
                name="action"
                value="schedule"
                checked={actionType === 'schedule'}
                onChange={() => setActionType('schedule')}
                className="hidden"
              />
              <Calendar className="w-4 h-4 text-blue-400" />
              <div className="text-xs">
                <div className="font-semibold text-slate-200">1-on-1 Faculty Mentoring</div>
                <div className="text-[10px] text-slate-400">Schedule mandatory 30-min conceptual review</div>
              </div>
            </label>

            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              actionType === 'remedial' ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <input
                type="radio"
                name="action"
                value="remedial"
                checked={actionType === 'remedial'}
                onChange={() => setActionType('remedial')}
                className="hidden"
              />
              <BookCheck className="w-4 h-4 text-indigo-400" />
              <div className="text-xs">
                <div className="font-semibold text-slate-200">Assign Remedial Module</div>
                <div className="text-[10px] text-slate-400">Targeted practice problem sets in {student.weakestSubject}</div>
              </div>
            </label>

            <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              actionType === 'email' ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <input
                type="radio"
                name="action"
                value="email"
                checked={actionType === 'email'}
                onChange={() => setActionType('email')}
                className="hidden"
              />
              <Mail className="w-4 h-4 text-amber-400" />
              <div className="text-xs">
                <div className="font-semibold text-slate-200">Automated Attendance & Academic Notice</div>
                <div className="text-[10px] text-slate-400">Send alert directly to {student.email}</div>
              </div>
            </label>
          </div>
        </div>

        {/* Custom notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Intervention Action Plan Notes
          </label>
          <textarea
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Focus on Python loops and recursion homework before upcoming test."
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
            <CheckCircle className="w-4 h-4" />
            Apply Action
          </button>
        </div>
      </form>
    </Modal>
  );
}
