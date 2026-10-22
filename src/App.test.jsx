import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Routing', () => {
  it('renders Login page by default at /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Вхід' })).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('navigates to Main page after submitting login form', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole('button', { name: 'Увійти' });
    fireEvent.click(loginButton);

    expect(screen.getByRole('heading', { name: 'Головна' })).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});