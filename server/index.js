import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


let tasks = [
  {
    id: 1,
    title: 'План курсової роботи',
    date: '2026-10-02',
    category: 'Навчання',
    difficulty: 4,
    completed: false,
  },
  {
    id: 2,
    title: 'Звіт для клієнта',
    date: '2026-10-12',
    category: 'Робота',
    difficulty: 3,
    completed: true,
  },
  {
    id: 3,
    title: 'Співдзвін щодо проєкту',
    date: '2026-10-22',
    category: 'Робота',
    difficulty: 2,
    completed: false,
  },
  {
    id: 4,
    title: 'Тренування в залі',
    date: '2026-10-09',
    category: 'Особисте',
    difficulty: 1,
    completed: false,
  },
  {
    id: 5,
    title: 'Підготовка до колоквіуму',
    date: '2026-10-15',
    category: 'Навчання',
    difficulty: 4,
    completed: true,
  },
  {
    id: 6,
    title: 'Англійська мова (лексика)',
    date: '2026-11-01',
    category: 'Навчання',
    difficulty: 5,
    completed: true,
  },
  {
    id: 7,
    title: 'Налаштування мережі',
    date: '2026-11-02',
    category: 'Робота',
    difficulty: 5,
    completed: false,
  },
];


app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Будь ласка, введіть email та пароль' });
  }


  return res.json({
    token: 'jwt-lifesync-token-2026',
    user: {
      email,
      name: email.split('@')[0],
    },
  });
});




app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});


app.post('/api/tasks', (req, res) => {
  const { title, date, category, difficulty } = req.body;

  if (!title || !date || !category || !difficulty) {
    return res.status(400).json({ message: 'Усі поля є обов’язковими' });
  }

  const newTask = {
    id: Date.now(),
    title,
    date,
    category,
    difficulty: Number(difficulty),
    completed: false,
  };

  tasks.unshift(newTask);
  res.status(201).json(newTask);
});


app.patch('/api/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: 'Завдання не знайдено' });
  }

  if (typeof req.body.completed === 'boolean') {
    task.completed = req.body.completed;
  } else {
    task.completed = !task.completed;
  }

  res.json(task);
});


app.delete('/api/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Сервер LifeSync працює на http://localhost:${PORT}`);
});
