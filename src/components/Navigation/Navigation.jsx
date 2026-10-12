import React from 'react';
import styles from './Navigation.module.css';

export default function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className={styles.nav}>
      <button 
        className={`${styles.navItem} ${activeTab === 'main' ? styles.active : ''}`}
        onClick={() => setActiveTab('main')}
      >
        <span className={styles.icon}>⏱</span>
        <span>Головна</span>
      </button>

      <button 
        className={`${styles.navItem} ${activeTab === 'calendar' ? styles.active : ''}`}
        onClick={() => setActiveTab('calendar')}
      >
        <span className={styles.icon}>📅</span>
        <span>Календар</span>
      </button>

      <button 
        className={`${styles.navItem} ${activeTab === 'tasks' ? styles.active : ''}`}
        onClick={() => setActiveTab('tasks')}
      >
        <span className={styles.icon}>📋</span>
        <span>Завдання</span>
      </button>
    </nav>
  );
}