import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App.jsx'; // Zakładając, że App.jsx znajduje się w tym samym folderze
import Register from '../component/Register.jsx';

// Mockowanie całego obiektu window.location z brakującymi właściwościami
vi.stubGlobal('location', {
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  href: '', // Domyślna wartość dla href
  origin: 'http://localhost', // Możesz dostosować origin do swojego środowiska
});

describe('App Component', () => {
  it('renders Home page at root path', async () => {
    render(<App />);

    // Sprawdzamy, czy na stronie głównej widoczny jest tekst "Warsaw"
    expect(screen.getByText(/Warsaw/i)).toBeInTheDocument();
  });

  it('renders Login page on /login route', async () => {
    window.history.pushState({}, 'Test Login', '/login');
    render(<App />);

    // Sprawdzamy, czy formularz logowania jest widoczny
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

});
