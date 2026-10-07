import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_STUDENTS, computeGlobalAnalytics, calculateStudentMetrics } from '../data/mockData';

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  // Navigation & Authentication state
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState({ name: 'Dr. Evelyn Vance', role: 'Head Academic Coordinator', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' });

  // Students Data State
  const [rawStudents, setRawStudents] = useState(() => {
    const saved = localStorage.getItem('nexora_students');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse local students data', e);
      }
    }
    return INITIAL_STUDENTS;
  });

  // Selected Student for 360 View
  const [selectedStudentId, setSelectedStudentId] = useState('NX-2024-001');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [performanceFilter, setPerformanceFilter] = useState('All');

  // Toasts
  const [toasts, setToasts] = useState([]);

  // UI Modals
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportModalType, setExportModalType] = useState('all');
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [actionTargetStudent, setActionTargetStudent] = useState(null);

  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Compute analytics
  const analytics = useMemo(() => {
    return computeGlobalAnalytics(rawStudents);
  }, [rawStudents]);

  // Filtered Students list
  const filteredStudents = useMemo(() => {
    if (!analytics) return [];
    return analytics.students.filter(student => {
      const matchSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchDept = departmentFilter === 'All' || student.department === departmentFilter;
      const matchSem = semesterFilter === 'All' || student.semester === semesterFilter;
      
      let matchPerf = true;
      if (performanceFilter === 'Excellent') matchPerf = student.average >= 85;
      else if (performanceFilter === 'Good') matchPerf = student.average >= 70 && student.average < 85;
      else if (performanceFilter === 'Needs Improvement') matchPerf = student.average >= 55 && student.average < 70;
      else if (performanceFilter === 'At Risk') matchPerf = student.average < 55 || student.attendance < 70;

      return matchSearch && matchDept && matchSem && matchPerf;
    });
  }, [analytics, searchQuery, departmentFilter, semesterFilter, performanceFilter]);

  // Selected student enriched
  const selectedStudent = useMemo(() => {
    if (!analytics) return null;
    return analytics.students.find(s => s.id === selectedStudentId) || analytics.students[0];
  }, [analytics, selectedStudentId]);

  // Actions
  const handleAddStudent = (newStudentData) => {
    const newStudent = {
      ...newStudentData,
      id: `NX-2024-${String(rawStudents.length + 1).padStart(3, '0')}`,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      historical: [
        Math.round((newStudentData.scores.python + newStudentData.scores.mathematics) / 2 - 4),
        Math.round((newStudentData.scores.ai + newStudentData.scores.sql) / 2 - 2),
        Math.round((newStudentData.scores.python + newStudentData.scores.networks) / 2),
        Math.round((newStudentData.scores.ai + newStudentData.scores.mathematics) / 2 + 1),
        Math.round((newStudentData.scores.python + newStudentData.scores.ai) / 2)
      ],
      assessments: {
        mid1: Math.round(newStudentData.scores.python * 0.95),
        mid2: Math.round(newStudentData.scores.ai * 0.98),
        assignments: 90,
        finalProject: Math.round(newStudentData.scores.sql * 0.96)
      }
    };

    const updated = [newStudent, ...rawStudents];
    setRawStudents(updated);
    localStorage.setItem('nexora_students', JSON.stringify(updated));
    addToast('Student Added', `${newStudent.name} (${newStudent.id}) was successfully added to NEXORA.`, 'success');
  };

  const handleResetData = () => {
    setRawStudents(INITIAL_STUDENTS);
    localStorage.removeItem('nexora_students');
    addToast('Data Reset', 'Restored 25 initial benchmark students dataset.', 'info');
  };

  const navigateToStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setCurrentPage('student-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginAsDemo = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
    addToast('Welcome to NEXORA', 'Logged in successfully in Demo Mode as Academic Admin.', 'success');
  };

  const loginUser = (email, password) => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
    addToast('Authentication Success', `Welcome back, ${email.split('@')[0]}!`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
    addToast('Signed Out', 'You have been safely signed out.', 'info');
  };

  const openExport = (type = 'all') => {
    setExportModalType(type);
    setIsExportModalOpen(true);
  };

  const openQuickAction = (student) => {
    setActionTargetStudent(student);
    setIsQuickActionOpen(true);
  };

  return (
    <StudentContext.Provider value={{
      currentPage,
      setCurrentPage,
      isAuthenticated,
      userRole,
      loginAsDemo,
      loginUser,
      logout,
      analytics,
      filteredStudents,
      rawStudents,
      selectedStudent,
      selectedStudentId,
      setSelectedStudentId,
      navigateToStudent,
      searchQuery,
      setSearchQuery,
      departmentFilter,
      setDepartmentFilter,
      semesterFilter,
      setSemesterFilter,
      performanceFilter,
      setPerformanceFilter,
      toasts,
      addToast,
      removeToast,
      isAddStudentOpen,
      setIsAddStudentOpen,
      isExportModalOpen,
      setIsExportModalOpen,
      exportModalType,
      openExport,
      isQuickActionOpen,
      setIsQuickActionOpen,
      actionTargetStudent,
      openQuickAction,
      handleAddStudent,
      handleResetData
    }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
}
