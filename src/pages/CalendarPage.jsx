import { useState } from 'react';
import { useTaskContext } from '../features/tasks/TaskContext';
import styles from './CalendarPage.module.css';

export default function CalendarPage() {
  const { tasks, toggleTask } = useTaskContext();

  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();


  const daysInMonth = new Date(year, month + 1, 0).getDate();


  const firstDayIndex = new Date(year, month, 1).getDay();

  const startDayOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;


  const prevMonthDaysCount = new Date(year, month, 0).getDate();
  const prevMonthDays = [];
  for (let i = startDayOffset - 1; i >= 0; i--) {
    prevMonthDays.push(prevMonthDaysCount - i);
  }

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);


  const monthName = currentDate.toLocaleDateString('uk-UA', { month: 'long' });
  const formattedMonthHeader =
    monthName.charAt(0).toUpperCase() + monthName.slice(1) + ` ${year}`;


  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(1);
  };


  const getDayScore = (day) => {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    return tasks
      .filter((t) => t.date === dateStr)
      .reduce((sum, task) => sum + Number(task.difficulty || 0), 0);
  };

  const getDayColor = (score) => {
    if (score === 0) return styles.grayDay;
    if (score >= 1 && score <= 4) return styles.greenDay;
    if (score >= 5 && score <= 8) return styles.yellowDay;
    return styles.redDay;
  };


  const selectedMonthStr = String(month + 1).padStart(2, '0');
  const selectedDayStr = String(selectedDay).padStart(2, '0');
  const selectedDateStr = `${year}-${selectedMonthStr}-${selectedDayStr}`;

  const selectedDayTasks = tasks.filter((t) => t.date === selectedDateStr);
  const selectedScore = getDayScore(selectedDay);

  const getBadgeText = (score) => {
    if (score === 0) return '0 балів · вільно';
    if (score <= 4) return `${score} балів · легкий`;
    if (score <= 8) return `${score} балів · помірний`;
    return `${score} балів · важкий`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Календар</h1>
        <p className={styles.subtitle}>
          LifeSync · складності всіх завдань кожного дня
        </p>
      </header>

      <div className={styles.calendarLayout}>
        <div className={styles.mainCalendar}>
          <div className={styles.monthHeader}>
            <h2>{formattedMonthHeader}</h2>
            <div className={styles.arrows}>
              <button type="button" onClick={handlePrevMonth}>
                &lt;
              </button>
              <button type="button" onClick={handleNextMonth}>
                &gt;
              </button>
            </div>
          </div>

          <div className={styles.weekDays}>
            <span>Пн</span>
            <span>Вт</span>
            <span>Ср</span>
            <span>Чт</span>
            <span>Пт</span>
            <span>Сб</span>
            <span>Нд</span>
          </div>

          <div className={styles.daysGrid}>
            {prevMonthDays.map((d, idx) => (
              <span key={`prev-${idx}`} className={styles.prevMonthDay}>
                {d}
              </span>
            ))}

            {days.map((d) => {
              const score = getDayScore(d);
              return (
                <div
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`${styles.dayCard} ${getDayColor(score)} ${
                    d === selectedDay ? styles.selectedDay : ''
                  }`}
                >
                  <span className={styles.dayNum}>{d}</span>
                  <span className={styles.dayScore}>
                    {score > 0 ? `${score} б.` : '—'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className={styles.selectedDayTasks}>
            <div className={styles.tasksHeader}>
              <h3>
                День: {selectedDay}{' '}
                {currentDate.toLocaleDateString('uk-UA', { month: 'long' })}{' '}
                {year}
              </h3>
              <span
                className={selectedScore >= 9 ? styles.redBadge : styles.meta}
              >
                {getBadgeText(selectedScore)}
              </span>
            </div>

            <div className={styles.taskList}>
              {selectedDayTasks.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '13px' }}>
                  На цей день запланованих завдань немає.
                </p>
              ) : (
                selectedDayTasks.map((task) => (
                  <label key={task.id} className={styles.taskRow}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id, task.completed)}
                      className={styles.checkbox}
                    />
                    <div className={styles.taskText}>{task.title}</div>
                    <span className={styles.meta}>
                      {task.category} · {task.difficulty}/5 складність
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.card}>
            <h3>Легенда</h3>
            <p>
              Колір дня показує суму складності всіх завдань цього дня:{' '}
              <strong>зелений 1–4</strong>,{' '}
              <strong>жовтий/помаранчевий 5–8</strong>,{' '}
              <strong>червоний 9+</strong>, без завдань — нейтральний.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Вибраний день</h3>
            <p>
              Усі завдання вибраного дня показуються з категорією та складністю.
              Виконані завдання автоматично закреслюються.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
