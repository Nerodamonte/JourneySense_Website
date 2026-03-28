import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import StaffLayout from './layouts/StaffLayout'
import AccountManagementPage from './pages/admin/AccountManagementPage'
import LoginPage from './pages/LoginPage'
import UserAccountDetailPage from './pages/admin/UserAccountDetailPage'
import StaffCreateJourneyPage from './pages/staff/StaffCreateJourneyPage'
import StaffDashboardPage from './pages/staff/StaffDashboardPage'
import StaffEditJourneyPage from './pages/staff/StaffEditJourneyPage'
import StaffFeedbackDetailPage from './pages/staff/StaffFeedbackDetailPage'
import StaffFeedbackPage from './pages/staff/StaffFeedbackPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/accounts" element={<AccountManagementPage />} />
        <Route path="/admin/accounts/:userId" element={<UserAccountDetailPage />} />

        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffDashboardPage />} />
          <Route path="feedback" element={<StaffFeedbackPage />} />
          <Route path="feedback/:feedbackId" element={<StaffFeedbackDetailPage />} />
          <Route path="journeys/new" element={<StaffCreateJourneyPage />} />
          <Route path="journeys/:journeyId/edit" element={<StaffEditJourneyPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
