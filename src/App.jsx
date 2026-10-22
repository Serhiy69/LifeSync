import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TasksPage from './pages/TasksPage';
import CalendarPage from './pages/CalendarPage';
import './App.css';

export default function App() {
  const location = useLocation();

  return (
    <div className="app-layout">
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendar" element={<CalendarPage />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>


      {location.pathname !== '/login' && <Navigation />}
    </div>
  );
}