import { useState } from 'react';
import styles from './TasksPage.module.css';

export default function TasksPage() {
  const [activeCat, setActiveCat] = useState('Навчання');
  const [activeDiff, setActiveDiff] = useState(5);

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
              <h2>Сьогодні, 5 жовтня</h2>
              <span className={styles.badge}>4 справи</span>
            </div>

            <div className={styles.taskList}>
              <div className={styles.taskItem}>
                <input type="checkbox" className={styles.checkbox} />
                <div className={styles.taskContent}>
                  <div className={styles.taskTitle}>План курсової роботи</div>
                  <div className={styles.taskMeta}>
                    <span className={styles.blueDot}>● Навчання</span> · 4/5 складність
                  </div>
                </div>
              </div>

              <div className={styles.taskItem}>
                <input type="checkbox" defaultChecked className={styles.checkbox} />
                <div className={styles.taskContent}>
                  <div className={styles.taskTitle}>Звіт для клієнта</div>
                  <div className={styles.taskMeta}>
                    <span className={styles.purpleDot}>● Робота</span> · 3/5 складність
                  </div>
                </div>
              </div>

              <div className={styles.taskItem}>
                <input type="checkbox" className={styles.checkbox} />
                <div className={styles.taskContent}>
                  <div className={styles.taskTitle}>Співдзвін щодо проєкту</div>
                  <div className={styles.taskMeta}>
                    <span className={styles.purpleDot}>● Робота</span> · 2/5 складність
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.formCard}>
            <h3>Нове завдання</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.field}>
                <label>Назва</label>
                <input type="text" placeholder="Введіть назву завдання..." />
              </div>

              <div className={styles.field}>
                <label>Дата</label>
                <input type="text" placeholder="Введіть дату..." />
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
                      {activeCat === cat && '✓ '}{cat}
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
                <div className={styles.diffHint}>1 — легке / 3 хвилини · 5 — важкий іспит / важливий реліз</div>
              </div>

              <button type="submit" className={styles.submitBtn}>Додати завдання</button>
            </form>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.infoBox}>
            <h3>Категорії</h3>
            <p>Усі справи на головному екрані належать до однієї з трьох категорій: Навчання, Робота або Особисте.</p>
          </div>
          <div className={styles.infoBox}>
            <h3>Аналіз</h3>
            <p>Головний екран показує тільки виконані завдання за вибраний період: День, Тиждень або Місяць.</p>
          </div>
        </div>
      </div>
    </div>
  );
}