import React from 'react';
import styles from './LoginPage.module.css';

export default function LoginPage({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoBadge}>✓</div>
        <h1 className={styles.title}>LifeSync</h1>
        <p className={styles.subtitle}>Навчання, робота й особисте життя.<br/>Усе на своєму місці.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Вхід</h2>
          
          <div className={styles.inputGroup}>
            <label>Електронна пошта</label>
            <input type="email" placeholder="Введіть email..." />
          </div>

          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input type="password" placeholder="Введіть пароль..." />
          </div>

          <button type="submit" className={styles.submitBtn}>Увійти</button>
        </form>

        <p className={styles.footerText}>
          Немає акаунту? <a href="#register" onClick={(e) => e.preventDefault()}>Зареєструватися</a>
        </p>
      </div>
    </div>
  );
}