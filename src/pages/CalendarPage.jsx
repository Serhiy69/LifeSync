import styles from './CalendarPage.module.css';

export default function CalendarPage() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const getDayColor = (day) => {
    if ([2, 6, 7, 10, 14, 17, 21, 23, 24, 27, 30].includes(day)) return styles.greenDay;
    if ([3, 8, 12, 15, 19, 20, 29].includes(day)) return styles.yellowDay;
    if ([5, 9, 13, 16, 22, 28].includes(day)) return styles.redDay;
    return styles.grayDay;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Календар</h1>
        <p className={styles.subtitle}>LifeSync · складності всіх завдань кожного дня</p>
      </header>

      <div className={styles.calendarLayout}>
        <div className={styles.mainCalendar}>
          <div className={styles.monthHeader}>
            <h2>Жовтень 2026</h2>
            <div className={styles.arrows}>
              <button>&lt;</button>
              <button>&gt;</button>
            </div>
          </div>

          <div className={styles.weekDays}>
            <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Нд</span>
          </div>

          <div className={styles.daysGrid}>
            <span className={styles.prevMonthDay}>28</span>
            <span className={styles.prevMonthDay}>29</span>
            <span className={styles.prevMonthDay}>30</span>
            {days.map((d) => (
              <div key={d} className={`${styles.dayCard} ${getDayColor(d)} ${d === 5 ? styles.selectedDay : ''}`}>
                <span className={styles.dayNum}>{d}</span>
                <span className={styles.dayScore}>{d === 5 ? '10 б.' : `${(d % 7) + 2} б.`}</span>
              </div>
            ))}
          </div>

          <div className={styles.selectedDayTasks}>
            <div className={styles.tasksHeader}>
              <h3>Пн, 5 жовтня</h3>
              <span className={styles.redBadge}>10 балів · важкий</span>
            </div>

            <div className={styles.taskList}>
              <label className={styles.taskRow}>
                <input type="checkbox" className={styles.checkbox} />
                <div className={styles.taskText}>План курсової роботи</div>
                <span className={styles.meta}>Навчання · 4/5 складність</span>
              </label>
              
              <label className={styles.taskRow}>
                <input type="checkbox" defaultChecked className={styles.checkbox} />
                <div className={styles.taskText}>Звіт для клієнта</div>
                <span className={styles.meta}>Робота · 3/5 складність</span>
              </label>
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.card}>
            <h3>Легенда</h3>
            <p>Колір дня показує суму складності всіх завдань цього дня: <strong>зелений 1–4</strong>, <strong>жовтий/помаранчевий 5–8</strong>, <strong>червоний 9+</strong>, без завдань — нейтральний.</p>
          </div>

          <div className={styles.card}>
            <h3>Вибраний день</h3>
            <p>Усі завдання вибраного дня показуються з категорією та складністю. Виконані завдання виділені зірочкою та закреслені.</p>
          </div>
        </div>
      </div>
    </div>
  );
}