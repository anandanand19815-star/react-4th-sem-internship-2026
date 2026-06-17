import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from './components/Layout/Sidebar.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'
import DashboardPage from './pages/Dashboard/DashboardPage.jsx'
import AttendancePage from './pages/Attendance/AttendancePage.jsx'
import StudentsPage from './pages/Students/StudentsPage.jsx'
import BatchesPage from './pages/Batches/BatchesPage.jsx'
import ReportsPage from './pages/Reports/ReportsPage.jsx'
import SettingsPage from './pages/Settings/SettingsPage.jsx'

const AppContent = () => {
  const location = useLocation()
  const hideLayout = location.pathname === '/login'

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white">
      {!hideLayout ? (
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
              <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
              <Route path="/batches" element={<ProtectedRoute><BatchesPage /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="*" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      ) : (
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </main>
      )}
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar theme="colored" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
