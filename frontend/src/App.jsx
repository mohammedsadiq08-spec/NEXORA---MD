import React, { useState } from 'react';
import { StudentProvider, useStudents } from './context/StudentContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';
import AddStudentModal from './components/modals/AddStudentModal';
import ReportExportModal from './components/modals/ReportExportModal';
import QuickActionModal from './components/modals/QuickActionModal';

// Views
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import DashboardView from './views/DashboardView';
import StudentsView from './views/StudentsView';
import StudentProfileView from './views/StudentProfileView';
import PerformanceView from './views/PerformanceView';
import SubjectAnalyticsView from './views/SubjectAnalyticsView';
import AttendanceView from './views/AttendanceView';
import AtRiskView from './views/AtRiskView';
import TopPerformersView from './views/TopPerformersView';
import ReportsView from './views/ReportsView';
import SettingsView from './views/SettingsView';

function AppContent() {
  const { 
    currentPage, 
    isAuthenticated,
    isAddStudentOpen,
    setIsAddStudentOpen,
    isExportModalOpen,
    setIsExportModalOpen,
    exportModalType,
    isQuickActionOpen,
    setIsQuickActionOpen,
    actionTargetStudent
  } = useStudents();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If on Landing Page
  if (currentPage === 'landing' && !isAuthenticated) {
    return (
      <>
        <LandingPage />
        <Toast />
      </>
    );
  }

  // If on Login Page
  if (currentPage === 'login' && !isAuthenticated) {
    return (
      <>
        <LoginPage />
        <Toast />
      </>
    );
  }

  // Main Dashboard / App Layout
  const renderCurrentView = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardView />;
      case 'students':
        return <StudentsView />;
      case 'student-profile':
        return <StudentProfileView />;
      case 'performance':
        return <PerformanceView />;
      case 'subjects':
        return <SubjectAnalyticsView />;
      case 'attendance':
        return <AttendanceView />;
      case 'at-risk':
        return <AtRiskView />;
      case 'top-performers':
        return <TopPerformersView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Navbar */}
        <Navbar
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          isMobileSidebarOpen={isMobileSidebarOpen}
        />

        {/* Page Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderCurrentView()}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Global Modals */}
      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
      />

      <ReportExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        defaultType={exportModalType}
      />

      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        student={actionTargetStudent}
      />

      {/* Floating Toasts */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StudentProvider>
      <AppContent />
    </StudentProvider>
  );
}
