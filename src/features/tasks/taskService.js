const API_URL = 'http://localhost:5000/api/tasks';

export const taskService = {
  async fetchTasks() {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Не вдалося завантажити завдання із сервера');
    }
    return response.json();
  },

  async createTask(taskData) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Помилка при створенні завдання');
    }

    return response.json();
  },

  async toggleTask(taskId, completed) {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
      throw new Error('Помилка при оновленні статусу завдання');
    }

    return response.json();
  },

  async deleteTask(taskId) {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Помилка при видаленні завдання');
    }
  },
};
