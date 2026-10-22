import styles from './MainPage.module.css';

export default function MainPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Головна</h1>
        <p className={styles.subtitle}>LifeSync · ваш баланс справ</p>
      </header>

      <div className={styles.filterGroup}>
        <button className={styles.filterBtn}>День</button>
        <button className={`${styles.filterBtn} ${styles.activeFilter}`}>Тиждень</button>
        <button className={styles.filterBtn}>Місяць</button>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.chartCard}>
          <span className={styles.dateRange}>28 вересня — 4 жовтня 2026</span>
          
          <div className={styles.donutChartContainer}>
            <div className={styles.donutChart}>
              <div className={styles.chartCenter}>
                <span className={styles.chartNumber}>24</span>
                <span className={styles.chartLabel}>виконані завдання</span>
              </div>
            </div>
          </div>

          <p className={styles.chartFooter}>Лише завершені справи за обраний період</p>

          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={`${styles.dot} ${styles.blueDot}`}></span>
              <span className={styles.statName}>Навчання</span>
              <span className={styles.statValue}>12</span>
              <span className={styles.statPercent}>50%</span>
            </div>
            <div className={styles.statItem}>
              <span className={`${styles.dot} ${styles.purpleDot}`}></span>
              <span className={styles.statName}>Робота</span>
              <span className={styles.statValue}>8</span>
              <span className={styles.statPercent}>33%</span>
            </div>
            <div className={styles.statItem}>
              <span className={`${styles.dot} ${styles.greenDot}`}></span>
              <span className={styles.statName}>Особисте</span>
              <span className={styles.statValue}>4</span>
              <span className={styles.statPercent}>17%</span>
            </div>
          </div>
        </div>

        <div className={styles.sideCards}>
          <div className={styles.infoCard}>
            <h3>Категорії</h3>
            <p>Усі справи на головному екрані належать до однієї з трьох категорій: Навчання, Робота або Особисте.</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Аналіз</h3>
            <p>Головний екран показує тільки виконані завдання за вибраний період: День, Тиждень або Місяць.</p>
          </div>
        </div>
      </div>

      <div className={styles.summaryBanner}>
        <strong>Половина виконаних справ — навчання</strong>
        <p>12 із 24 завдань. Робота й особисті справи разом — ще 12.</p>
      </div>
    </div>
  );
}