import { useState } from 'react';
import { useTaskContext } from '../features/tasks/TaskContext';
import styles from './TasksPage.module.css';

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
  });
};

export default function TasksPage() {
  const { tasks, isLoading, addTask, toggleTask } = useTaskContext();
  const todayStr = getTodayDateString();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(todayStr);
  const [activeCat, setActiveCat] = useState('Навчання');
  const [activeDiff, setActiveDiff] = useState(5);

  const todayTasks = tasks.filter((t) => t.date === todayStr);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    await addTask({
      title: title.trim(),
      date,
      category: activeCat,
      difficulty: activeDiff,
    });

    setTitle('');
  };

  const getCategoryDotClass = (category) => {
    if (category === 'Навчання') return styles.blueDot;
    if (category === 'Робота') return styles.purpleDot;
    return styles.blueDot;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Завдання</h1>
        <p className={styles.subtitle}>LifeSync · список справ</p>
      </header>

      <div className={styles.tasksGrid}>
        <div className={styles.leftColumn}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Сьогодні, {formatDisplayDate(todayStr)}</h2>
              <span className={styles.badge}>{todayTasks.length} справи</span>
            </div>

            {isLoading ? (
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                Завантаження завдань...
              </p>
            ) : (
              <div className={styles.taskList}>
                {todayTasks.length === 0 ? (
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>
                    На сьогодні справ немає.
                  </p>
                ) : (
                  todayTasks.map((task) => (
                    <div key={task.id} className={styles.taskItem}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id, task.completed)}
                        className={styles.checkbox}
                      />
                      <div className={styles.taskContent}>
                        <div className={styles.taskTitle}>{task.title}</div>
                        <div className={styles.taskMeta}>
                          <span className={getCategoryDotClass(task.category)}>
                            ● {task.category}
                          </span>{' '}
                          · {task.difficulty}/5 складність
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>

          <section className={styles.formCard}>
            <h3>Нове завдання</h3>
            <form onSubmit={handleCreateTask}>
              <div className={styles.field}>
                <label>Назва</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введіть назву завдання..."
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Дата</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Категорія · обов'язково одна</label>
                <div className={styles.categoryToggle}>
                  {['Навчання', 'Робота', 'Особисте'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={activeCat === cat ? styles.activeCat : ''}
                      onClick={() => setActiveCat(cat)}
                    >
                      {activeCat === cat && '✓ '}
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label>Складність</label>
                <div className={styles.difficultyGrid}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`${styles.diffBtn} ${activeDiff === level ? styles.activeDiff : ''}`}
                      onClick={() => setActiveDiff(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <div className={styles.diffHint}>
                  1 — легке / 3 хвилини · 5 — важкий іспит / важливий реліз
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Додати завдання
              </button>
            </form>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.infoBox}>
            <h3>Категорії</h3>
            <p>
              Усі справи на головному екрані належать до однієї з трьох
              категорій: Навчання, Робота або Особисте.
            </p>
          </div>
          <div className={styles.infoBox}>
            <h3>Аналіз</h3>
            <p>
              Головний екран показує тільки виконані завдання за вибраний
              період: День, Тиждень або Місяць.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}