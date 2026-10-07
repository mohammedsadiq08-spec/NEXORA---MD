import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  LineChart, 
  BookOpen, 
  CalendarCheck, 
  AlertTriangle, 
  Trophy, 
  FileText, 
  Settings, 
  Sparkles,
  ChevronRight,
  LogOut,
  UserCheck
} from 'lucide-react';
import NexoraLogo from '../common/NexoraLogo';
import { useStudents } from '../../context/StudentContext';

export default function Sidebar({ isOpen, onClose }) {
  const { currentPage, setCurrentPage, analytics, logout, userRole, selectedStudent } = useStudents();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'students', label: 'Students', icon: Users, count: analytics?.totalCount },
    { id: 'student-profile', label: 'Student 360°', icon: UserCheck, badge: 'Active' },
    { id: 'performance', label: 'Performance', icon: LineChart, badge: null },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, badge: null },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: null },
    { id: 'at-risk', label: 'At-Risk Students', icon: AlertTriangle, count: analytics?.atRiskCount, countVariant: 'rose' },
    { id: 'top-performers', label: 'Top Performers', icon: Trophy, count: 5, countVariant: 'amber' },
    { id: 'reports', label: 'Reports', icon: FileText, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#080C16] border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 px-6 flex items-center border-b border-slate-800/80 justify-between">
          <div 
            onClick={() => handleNavClick('dashboard')}
            className="cursor-pointer group flex items-center gap-2"
          >
            <NexoraLogo size="default" />
          </div>
        </div>

        {/* Section Title */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>Intelligence Suite</span>
            <span className="flex items-center gap-1 text-[9px] text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-1.5 py-0.5 rounded">
              <Sparkles className="w-2.5 h-2.5" /> v2.4
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-violet-600/10 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {/* Badges / Counts */}
                {item.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      item.countVariant === 'rose'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : item.countVariant === 'amber'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.count}
                  </span>
                )}

                {item.badge && !item.count && (
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Selected Student Active Card Snippet */}
        {selectedStudent && (
          <div className="px-4 py-3 mx-3 mb-3 bg-[#0D1322] border border-blue-500/20 rounded-xl">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                Current 360° Focus
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {selectedStudent.id}
              </span>
            </div>
            <div 
              onClick={() => handleNavClick('student-profile')}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-6 h-6 rounded-full object-cover border border-blue-400/40"
                />
                <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors truncate max-w-[120px]">
                  {selectedStudent.name}
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Bottom Profile / Quick Logout */}
        <div className="p-3 border-t border-slate-800/80 bg-[#070913]/60">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={userRole.avatar}
                alt={userRole.name}
                className="w-8 h-8 rounded-lg object-cover border border-slate-700 flex-shrink-0"
              />
              <div className="overflow-hidden text-left">
                <p className="text-xs font-semibold text-slate-200 truncate">
                  {userRole.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  Academic Coordinator
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
