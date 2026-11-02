import { useState, useMemo } from 'react';
import { useTaskContext } from '../features/tasks/TaskContext';
import styles from './MainPage.module.css';


const formatDateToISO = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function MainPage() {
  const { tasks } = useTaskContext();
  const [filterPeriod, setFilterPeriod] = useState('Тиждень');
  const today = useMemo(() => new Date(), []);
  const todayStr = formatDateToISO(today);


  const filteredCompletedTasks = useMemo(() => {
    const completed = tasks.filter((t) => t.completed);

    if (filterPeriod === 'День') {
      return completed.filter((t) => t.date === todayStr);
    }

    if (filterPeriod === 'Тиждень') {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 6);
      const weekAgoStr = formatDateToISO(weekAgo);
      return completed.filter(
        (t) => t.date >= weekAgoStr && t.date <= todayStr
      );
    }

    if (filterPeriod === 'Місяць') {
      const monthAgo = new Date(today);
      monthAgo.setDate(today.getDate() - 30);
      const monthAgoStr = formatDateToISO(monthAgo);
      return completed.filter(
        (t) => t.date >= monthAgoStr && t.date <= todayStr
      );
    }

    return completed;
  }, [tasks, filterPeriod, todayStr]);


  const stats = useMemo(() => {
    const study = filteredCompletedTasks.filter(
      (t) => t.category === 'Навчання'
    ).length;
    const work = filteredCompletedTasks.filter(
      (t) => t.category === 'Робота'
    ).length;
    const personal = filteredCompletedTasks.filter(
      (t) => t.category === 'Особисте'
    ).length;
    const total = filteredCompletedTasks.length;

    const studyPct = total ? Math.round((study / total) * 100) : 0;
    const workPct = total ? Math.round((work / total) * 100) : 0;
    const personalPct = total ? Math.max(0, 100 - studyPct - workPct) : 0;

    return { study, work, personal, total, studyPct, workPct, personalPct };
  }, [filteredCompletedTasks]);


  const gradientStyle = useMemo(() => {
    if (stats.total === 0) {
      return { background: '#e5e7eb' };
    }
    const p1 = stats.studyPct;
    const p2 = p1 + stats.workPct;
    return {
      background: `conic-gradient(#3b82f6 0% ${p1}%, #8b5cf6 ${p1}% ${p2}%, #10b981 ${p2}% 100%)`,
    };
  }, [stats]);


  const dateRangeLabel = useMemo(() => {
    if (filterPeriod === 'День') {
      return today.toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
    if (filterPeriod === 'Тиждень') {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 6);
      return `${weekAgo.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })} — ${today.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    }
    if (filterPeriod === 'Місяць') {
      const monthAgo = new Date(today);
      monthAgo.setDate(today.getDate() - 30);
      return `${monthAgo.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })} — ${today.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    }
    return '';
  }, [filterPeriod, today]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Головна</h1>
        <p className={styles.subtitle}>LifeSync · ваш баланс справ</p>
      </header>

      <div className={styles.filterGroup}>
        {['День', 'Тиждень', 'Місяць'].map((period) => (
          <button
            key={period}
            type="button"
            className={`${styles.filterBtn} ${
              filterPeriod === period ? styles.activeFilter : ''
            }`}
            onClick={() => setFilterPeriod(period)}
          >
            {period}
          </button>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.chartCard}>
          <span className={styles.dateRange}>{dateRangeLabel}</span>

          <div className={styles.donutChartContainer}>
            <div className={styles.donutChart} style={gradientStyle}>
              <div className={styles.chartCenter}>
                <span className={styles.chartNumber}>{stats.total}</span>
                <span className={styles.chartLabel}>виконані завдання</span>
              </div>
            </div>
          </div>

          <p className={styles.chartFooter}>
            Лише завершені справи за обраний період
          </p>

          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={`${styles.dot} ${styles.blueDot}`}></span>
              <span className={styles.statName}>Навчання</span>
              <span className={styles.statValue}>{stats.study}</span>
              <span className={styles.statPercent}>{stats.studyPct}%</span>
            </div>
            <div className={styles.statItem}>
              <span className={`${styles.dot} ${styles.purpleDot}`}></span>
              <span className={styles.statName}>Робота</span>
              <span className={styles.statValue}>{stats.work}</span>
              <span className={styles.statPercent}>{stats.workPct}%</span>
            </div>
            <div className={styles.statItem}>
              <span className={`${styles.dot} ${styles.greenDot}`}></span>
              <span className={styles.statName}>Особисте</span>
              <span className={styles.statValue}>{stats.personal}</span>
              <span className={styles.statPercent}>{stats.personalPct}%</span>
            </div>
          </div>
        </div>

        <div className={styles.sideCards}>
          <div className={styles.infoCard}>
            <h3>Категорії</h3>
            <p>
              Усі справи на головному екрані належать до однієї з трьох
              категорій: Навчання, Робота або Особисте.
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Аналіз</h3>
            <p>
              Головний екран показує тільки виконані завдання за вибраний
              період: День, Тиждень або Місяць.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.summaryBanner}>
        <strong>
          {stats.total === 0
            ? 'Немає виконаних справ за цей період'
            : stats.study >= stats.work && stats.study >= stats.personal
              ? 'Більшість виконаних справ — навчання'
              : 'Активний баланс робочих та особистих справ'}
        </strong>
        <p>
          {stats.study} з {stats.total} завдань припадають на навчання. Інші
          справи — {stats.work + stats.personal}.
        </p>
      </div>
    </div>
  );
}
