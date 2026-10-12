import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TasksPage from './pages/TasksPage';
import CalendarPage from './pages/CalendarPage';
import './App.css';

export default function App() {

  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="app-layout">
      <main className="content">
        {activeTab === 'login' && (
          <LoginPage onLogin={() => setActiveTab('main')} />
        )}
        {activeTab === 'main' && <MainPage />}
        {activeTab === 'calendar' && <CalendarPage />}
        {activeTab === 'tasks' && <TasksPage />}
      </main>
      
      {activeTab !== 'login' && (
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}