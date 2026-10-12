import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App component', () => {
  it('renders Login page by default without navigation', () => {
    render(<App />)
    
    expect(screen.getByRole('heading', { name: 'Вхід' })).toBeInTheDocument()
    
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('navigates to Main page and shows navigation after login', () => {
    render(<App />)

    const loginButton = screen.getByRole('button', { name: 'Увійти' })
    fireEvent.click(loginButton)

    expect(screen.getByRole('heading', { name: 'Головна' })).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})