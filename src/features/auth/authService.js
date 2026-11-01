const API_URL = 'http://localhost:5000/api/auth';

export const authService = {
  async login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Помилка авторизації');
    }

    const data = await response.json();


    localStorage.setItem('lifesync_token', data.token);
    localStorage.setItem('lifesync_user', JSON.stringify(data.user));

    return data;
  },

  logout() {
    localStorage.removeItem('lifesync_token');
    localStorage.removeItem('lifesync_user');
  },

  getUser() {
    const user = localStorage.getItem('lifesync_user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('lifesync_token');
  },
};
