import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Calendar, User, LogOut, Settings, ExternalLink, ShieldAlert, Sparkles, Menu, X } from 'lucide-react';
import { useStudents } from '../../context/StudentContext';

export default function Navbar({ onToggleMobileSidebar, isMobileSidebarOpen }) {
  const { 
    userRole, 
    logout, 
    searchQuery, 
    setSearchQuery, 
    filteredStudents, 
    navigateToStudent, 
    setCurrentPage,
    analytics 
  } = useStudents();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  const notifications = [
    {
      id: 1,
      title: 'Critical Risk Alert',
      desc: `${analytics?.criticalCount || 3} students require immediate academic intervention.`,
      time: '10m ago',
      type: 'critical'
    },
    {
      id: 2,
      title: 'Weekly Attendance Sync',
      desc: 'Attendance logs synchronized. 2 students dropped below 70%.',
      time: '1h ago',
      type: 'warning'
    },
    {
      id: 3,
      title: 'Assessment Computed',
      desc: 'Python Mid-term 2 percentiles updated across all 4 departments.',
      time: '3h ago',
      type: 'info'
    }
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#070913]/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Sidebar Trigger & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          aria-label="Toggle Navigation"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Global Instant Search */}
        <div ref={searchRef} className="relative w-full max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search students, roll no, department..."
              className="w-full pl-10 pr-4 py-2 bg-[#0F172A]/80 border border-slate-700/60 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchFocused && searchQuery.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0F172A] border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              <div className="p-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex justify-between">
                <span>Matching Students ({filteredStudents.length})</span>
                <span>Press row to view 360°</span>
              </div>
              {filteredStudents.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No students found matching "{searchQuery}"
                </div>
              ) : (
                filteredStudents.slice(0, 6).map((student) => (
                  <div
                    key={student.id}
                    onClick={() => {
                      navigateToStudent(student.id);
                      setIsSearchFocused(false);
                    }}
                    className="p-3 hover:bg-blue-600/10 hover:border-l-2 hover:border-blue-500 cursor-pointer flex items-center justify-between border-b border-slate-800/40 last:border-0 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                          {student.name}
                          <span className="text-[10px] text-slate-400 font-mono">({student.id})</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {student.department} • Avg: {student.average}%
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        student.average >= 80 ? 'bg-emerald-500/20 text-emerald-300' :
                        student.average < 60 ? 'bg-rose-500/20 text-rose-300' : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        Grade {student.grade}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Live status, Date, Notification, Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Live Analytics Badge */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Live Analytics</span>
        </div>

        {/* Date Display */}
        <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 bg-[#0F172A]/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <Calendar className="w-3.5 h-3.5 text-blue-400" />
          <span>{todayFormatted}</span>
        </div>

        {/* Notifications Popover */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#070913]"></span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Notifications</h4>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 font-semibold px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <button
                  onClick={() => setCurrentPage('at-risk')}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                >
                  View Risks
                </button>
              </div>

              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      setCurrentPage('at-risk');
                    }}
                    className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer border border-slate-800/80 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-semibold ${
                        n.type === 'critical' ? 'text-rose-400' :
                        n.type === 'warning' ? 'text-amber-400' : 'text-blue-400'
                      }`}>
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700/60"
          >
            <img
              src={userRole.avatar}
              alt={userRole.name}
              className="w-8 h-8 rounded-xl object-cover border border-blue-500/30"
            />
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-white leading-tight">
                {userRole.name}
              </div>
              <div className="text-[10px] text-blue-400 leading-tight">
                Admin
              </div>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in zoom-in-95">
              <div className="p-3 border-b border-slate-800 mb-1">
                <p className="text-xs font-bold text-white">{userRole.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{userRole.role}</p>
              </div>

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  setCurrentPage('settings');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors text-left"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                Settings & Preferences
              </button>

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
