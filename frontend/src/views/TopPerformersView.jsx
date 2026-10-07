import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Award, 
  Crown, 
  Sparkles, 
  Medal, 
  Star, 
  Filter, 
  Download, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { useStudents } from '../context/StudentContext';
import { DEPARTMENTS } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function TopPerformersView() {
  const { rawStudents, navigateToStudent, openExport } = useStudents();
  const [filterScope, setFilterScope] = useState('Overall'); // 'Overall' | 'Department' | 'Subject'
  const [selectedDept, setSelectedDept] = useState('CSE AI/ML');
  const [selectedSubject, setSelectedSubject] = useState('python');

  // Trigger celebration confetti on mount
  useEffect(() => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, []);

  // Compute ranking according to filter scope
  let rankedStudents = rawStudents.map(student => {
    let computedScore = student.average;
    if (filterScope === 'Subject') {
      computedScore = student.scores[selectedSubject] || student.average;
    }
    return {
      ...student,
      rankingScore: computedScore
    };
  });

  if (filterScope === 'Department') {
    rankedStudents = rankedStudents.filter(s => s.department === selectedDept);
  }

  rankedStudents.sort((a, b) => b.rankingScore - a.rankingScore);

  const top1 = rankedStudents[0];
  const top2 = rankedStudents[1];
  const top3 = rankedStudents[2];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Academic Honor Roll & Leaderboard
            </h1>
            <span className="text-xs font-mono uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> Dean's List
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Recognizing excellence, high cumulative scores, and consistent subject mastery.
          </p>
        </div>

        <button
          onClick={() => openExport('top')}
          className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 font-semibold rounded-xl text-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Honor Roll (PDF)</span>
        </button>
      </div>

      {/* Scope Filter Toolbar */}
      <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {['Overall', 'Department', 'Subject'].map((scope) => (
            <button
              key={scope}
              onClick={() => setFilterScope(scope)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                filterScope === scope
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {scope} Leaderboard
            </button>
          ))}
        </div>

        {/* Secondary select if Department / Subject is chosen */}
        {filterScope === 'Department' && (
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-400">Department:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              {DEPARTMENTS.filter(d => d !== 'All').map(d => (
                <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>
              ))}
            </select>
          </div>
        )}

        {filterScope === 'Subject' && (
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-400">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="python" className="bg-slate-900 text-white">Python Programming</option>
              <option value="ai" className="bg-slate-900 text-white">Artificial Intelligence</option>
              <option value="sql" className="bg-slate-900 text-white">Database & SQL</option>
              <option value="mathematics" className="bg-slate-900 text-white">Applied Mathematics</option>
              <option value="networks" className="bg-slate-900 text-white">Computer Networks</option>
            </select>
          </div>
        )}
      </div>

      {/* Top 3 Olympic Podium Visual */}
      {rankedStudents.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Rank 2 (Silver) */}
          {top2 && (
            <div 
              onClick={() => navigateToStudent(top2.id)}
              className="order-2 md:order-1 bg-gradient-to-b from-[#161E2E] to-[#0D1322] border border-slate-700/80 rounded-3xl p-6 text-center cursor-pointer transition-all hover:-translate-y-2 hover:border-slate-500 shadow-xl relative mt-0 md:mt-6"
            >
              <div className="w-10 h-10 rounded-full bg-slate-300/20 text-slate-200 border border-slate-400/40 flex items-center justify-center font-bold text-base mx-auto mb-3 shadow-inner">
                🥈 2nd
              </div>

              <div className="relative w-20 h-20 mx-auto mb-3">
                <img
                  src={top2.avatar}
                  alt={top2.name}
                  className="w-full h-full rounded-2xl object-cover border-2 border-slate-400/50 shadow-lg"
                />
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">{top2.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{top2.department} • {top2.id}</p>

              <div className="mt-4 pt-3 border-t border-slate-800 flex justify-around text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Score</div>
                  <div className="text-base font-extrabold text-slate-200 font-mono">{top2.rankingScore}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Attendance</div>
                  <div className="text-base font-extrabold text-slate-200 font-mono">{top2.attendance}%</div>
                </div>
              </div>
            </div>
          )}

          {/* Rank 1 (Gold) */}
          {top1 && (
            <div 
              onClick={() => navigateToStudent(top1.id)}
              className="order-1 md:order-2 bg-gradient-to-b from-[#2A200B] via-[#1A160E] to-[#0D1322] border-2 border-amber-500/70 rounded-3xl p-6 text-center cursor-pointer transition-all hover:-translate-y-2 shadow-2xl shadow-amber-500/20 relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-lg">
                <Crown className="w-3.5 h-3.5" /> Overall Topper
              </div>

              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center justify-center font-bold text-xl mx-auto mb-3 shadow-inner mt-2">
                🥇 1st
              </div>

              <div className="relative w-24 h-24 mx-auto mb-3">
                <img
                  src={top1.avatar}
                  alt={top1.name}
                  className="w-full h-full rounded-2xl object-cover border-2 border-amber-400 shadow-xl"
                />
                <span className="absolute -bottom-1 -right-1 p-1 bg-amber-500 rounded-full text-slate-950">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-white tracking-tight">{top1.name}</h3>
              <p className="text-xs text-amber-300/80 mt-0.5 font-medium">{top1.department} • {top1.id}</p>

              <div className="mt-4 pt-3 border-t border-amber-900/40 flex justify-around text-xs">
                <div>
                  <div className="text-[10px] text-amber-400 uppercase">Top Mark</div>
                  <div className="text-xl font-extrabold text-amber-300 font-mono">{top1.rankingScore}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-amber-400 uppercase">Attendance</div>
                  <div className="text-xl font-extrabold text-amber-300 font-mono">{top1.attendance}%</div>
                </div>
              </div>
            </div>
          )}

          {/* Rank 3 (Bronze) */}
          {top3 && (
            <div 
              onClick={() => navigateToStudent(top3.id)}
              className="order-3 bg-gradient-to-b from-[#1F140E] to-[#0D1322] border border-amber-800/60 rounded-3xl p-6 text-center cursor-pointer transition-all hover:-translate-y-2 hover:border-amber-700 shadow-xl relative mt-0 md:mt-8"
            >
              <div className="w-10 h-10 rounded-full bg-amber-800/20 text-amber-400 border border-amber-700/40 flex items-center justify-center font-bold text-base mx-auto mb-3 shadow-inner">
                🥉 3rd
              </div>

              <div className="relative w-20 h-20 mx-auto mb-3">
                <img
                  src={top3.avatar}
                  alt={top3.name}
                  className="w-full h-full rounded-2xl object-cover border-2 border-amber-700/50 shadow-lg"
                />
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">{top3.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{top3.department} • {top3.id}</p>

              <div className="mt-4 pt-3 border-t border-slate-800 flex justify-around text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Score</div>
                  <div className="text-base font-extrabold text-amber-200 font-mono">{top3.rankingScore}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Attendance</div>
                  <div className="text-base font-extrabold text-amber-200 font-mono">{top3.attendance}%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Complete Leaderboard Table */}
      <div className="bg-[#0F172A]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Full Cohort Ranking ({rankedStudents.length} Students)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Sorted by: {filterScope} Score (Desc)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 text-center w-16">Rank</th>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4 text-right">Score</th>
                <th className="py-3.5 px-4 text-right">Attendance</th>
                <th className="py-3.5 px-4 text-center">Grade</th>
                <th className="py-3.5 px-4 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {rankedStudents.map((student, idx) => (
                <tr
                  key={student.id}
                  onClick={() => navigateToStudent(student.id)}
                  className="hover:bg-blue-600/5 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4 text-center font-bold font-mono">
                    {idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : `#${idx + 1}`}
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
                        <div className="text-[10px] text-slate-400 font-mono">
                          {student.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 font-medium">
                    {student.department}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                    {student.rankingScore}%
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                    {student.attendance}%
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-mono font-bold">
                      {student.grade}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                      View 360° →
                    </span>
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
