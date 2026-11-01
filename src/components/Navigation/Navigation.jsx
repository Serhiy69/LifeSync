import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/main"
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.active : ''}`
        }
      >
        <span className={styles.icon}>⏱</span>
        <span>Головна</span>
      </NavLink>

      <NavLink
        to="/calendar"
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.active : ''}`
        }
      >
        <span className={styles.icon}>📅</span>
        <span>Календар</span>
      </NavLink>

      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.active : ''}`
        }
      >
        <span className={styles.icon}>📋</span>
        <span>Завдання</span>
      </NavLink>
    </nav>
  );
}
