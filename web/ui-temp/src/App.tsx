import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { DashboardPage } from './pages/student/DashboardPage';
import { SubjectOverviewPage } from './pages/student/SubjectOverviewPage';
import { StudyModePage } from './pages/student/StudyModePage';
import { FlashcardConfigPage } from './pages/student/FlashcardConfigPage';
import { FlashcardSessionPage } from './pages/student/FlashcardSessionPage';
import { ExamConfigPage } from './pages/student/ExamConfigPage';
import { ExamSessionPage } from './pages/student/ExamSessionPage';
import { ExamResultsPage } from './pages/student/ExamResultsPage';
import { ProgressDashboardPage } from './pages/student/ProgressDashboardPage';
import { QuestionHistoryPage } from './pages/student/QuestionHistoryPage';
// Admin Imports
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { SubjectManagementPage } from './pages/admin/SubjectManagementPage';
import { ContentAuthoringPage } from './pages/admin/ContentAuthoringPage';
import { FlashcardManagementPage } from './pages/admin/FlashcardManagementPage';
import { QuestionBankPage } from './pages/admin/QuestionBankPage';
import { WorkflowReviewPage } from './pages/admin/WorkflowReviewPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { SettingsPage } from './pages/admin/SettingsPage';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Student Protected Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/subjects/:subjectId" element={<SubjectOverviewPage />} />
        <Route path="/study/:nodeId" element={<StudyModePage />} />

        {/* Student Learning Routes */}
        <Route
          path="/flashcards/config/:nodeId"
          element={<FlashcardConfigPage />} />

        <Route path="/flashcards/session" element={<FlashcardSessionPage />} />
        <Route path="/exam/config/:examId" element={<ExamConfigPage />} />
        <Route path="/exam/session/:examId" element={<ExamSessionPage />} />
        <Route path="/exam/results/:attemptId" element={<ExamResultsPage />} />
        <Route path="/progress" element={<ProgressDashboardPage />} />
        <Route
          path="/questions/:questionId/history"
          element={<QuestionHistoryPage />} />


        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="subjects" element={<SubjectManagementPage />} />
          <Route path="content" element={<ContentAuthoringPage />} />
          <Route path="flashcards" element={<FlashcardManagementPage />} />
          <Route path="exams" element={<QuestionBankPage />} />
          <Route path="workflow" element={<WorkflowReviewPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* Placeholder routes for future admin pages */}
          <Route
            path="*"
            element={<div className="p-8">Page under construction</div>} />

        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>);

}