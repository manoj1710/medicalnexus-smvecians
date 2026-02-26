import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './state/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PatientLayout from './layouts/PatientLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth
import LoginPage from './features/auth/LoginPage';

// Patient Pages
import PatientHome from './features/patient/PatientHome';
import PatientAssessment from './features/patient/PatientAssessment';
import PatientBooking from './features/patient/PatientBooking';
import PatientHistory from './features/patient/PatientHistory';
import PatientProfile from './features/patient/PatientProfile';

// Admin Pages
import AdminDashboard from './features/admin/AdminDashboard';
import AdminQueries from './features/admin/AdminQueries';
import AdminAppointments from './features/admin/AdminAppointments';
import AdminAnalytics from './features/admin/AdminAnalytics';
import AdminSecurity from './features/admin/AdminSecurity';

// Landing (Legacy/General)
import LandingPage from './features/landing/LandingPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Patient Routes */}
          <Route path="/patient" element={
            <ProtectedRoute allowedRole="Patient">
              <PatientLayout>
                <Navigate to="/patient/home" replace />
              </PatientLayout>
            </ProtectedRoute>
          } />

          <Route path="/patient/home" element={
            <ProtectedRoute allowedRole="Patient">
              <PatientLayout><PatientHome /></PatientLayout>
            </ProtectedRoute>
          } />
          <Route path="/patient/assessment" element={
            <ProtectedRoute allowedRole="Patient">
              <PatientLayout><PatientAssessment /></PatientLayout>
            </ProtectedRoute>
          } />
          <Route path="/patient/booking" element={
            <ProtectedRoute allowedRole="Patient">
              <PatientLayout><PatientBooking /></PatientLayout>
            </ProtectedRoute>
          } />
          <Route path="/patient/history" element={
            <ProtectedRoute allowedRole="Patient">
              <PatientLayout><PatientHistory /></PatientLayout>
            </ProtectedRoute>
          } />
          <Route path="/patient/profile" element={
            <ProtectedRoute allowedRole="Patient">
              <PatientLayout><PatientProfile /></PatientLayout>
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout>
                <Navigate to="/admin/dashboard" replace />
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout><AdminDashboard /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/queries" element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout><AdminQueries /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/appointments" element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout><AdminAppointments /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout><AdminAnalytics /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/security" element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout><AdminSecurity /></AdminLayout>
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
