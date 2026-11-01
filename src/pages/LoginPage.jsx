import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      await login(email, password);
      navigate('/main');
    } catch { /* empty */ }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoBadge}>✓</div>
        <h1 className={styles.title}>LifeSync</h1>
        <p className={styles.subtitle}>
          Навчання, робота й особисте життя.
          <br />
          Усе на своєму місці.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Вхід</h2>

          {error && (
            <div
              style={{
                color: '#dc2626',
                fontSize: '13px',
                background: '#fee2e2',
                padding: '8px 12px',
                borderRadius: '8px',
              }}
            >
              {error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>Електронна пошта</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введіть email..."
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введіть пароль..."
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}>
            {isLoading ? 'Входимо...' : 'Увійти'}
          </button>
        </form>

        <p className={styles.footerText}>
          Немає акаунту?{' '}
          <a href="#register" onClick={(e) => e.preventDefault()}>
            Зареєструватися
          </a>
        </p>
      </div>
    </div>
  );
}