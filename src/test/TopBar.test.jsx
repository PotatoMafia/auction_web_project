import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom'; // Dodajemy BrowserRouter
import TopBar from '../component/TopBar'; // Poprawiamy ścieżkę importu

// Mockowanie hooka useNavigate
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'), // Importujemy oryginalny kod
  useNavigate: () => mockNavigate, // Modyfikujemy tylko useNavigate
  BrowserRouter: ({ children }) => <div>{children}</div>, // Mockujemy BrowserRouter
}));

describe('TopBar Component', () => {
  beforeEach(() => {
    // Zresetuj mocki przed każdym testem
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should render login button when not logged in', () => {
    render(
      <BrowserRouter>
        <TopBar onLogout={vi.fn()} onLogin={vi.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /userpanel/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /auction board/i })).not.toBeInTheDocument();
  });

 

  it('should call onLogin when clicking login button', () => {
    const onLogin = vi.fn();

    render(
      <BrowserRouter>
        <TopBar onLogout={vi.fn()} onLogin={onLogin} />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    expect(onLogin).toHaveBeenCalled();
    expect(localStorage.getItem('token')).toBeNull();
  });


  it('should navigate to home when home button is clicked', () => {
    render(
      <BrowserRouter>
        <TopBar onLogout={vi.fn()} onLogin={vi.fn()} />
      </BrowserRouter>
    );

    const homeButton = screen.getByRole('button', { name: /home/i });
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

});
