import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Login from '../component/Login';

// Partially mock `react-router-dom`
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom'); // Import the actual module
  return {
    ...actual, // Keep all other exports
    useNavigate: vi.fn(), // Mock `useNavigate`
  };
});

const mockNavigate = vi.fn();

beforeEach(() => {
  vi.clearAllMocks(); // Clear mocks before each test
  useNavigate.mockReturnValue(mockNavigate); // Set mock return value
});

test('navigates to user page on successful login', async () => {
  // Mock fetch API
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          access_token: 'mockToken',
          role: 'user',
          user_id: '12345',
        }),
    })
  );

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  // Simulate user interactions
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });

  await userEvent.type(emailInput, 'test@example.com');
  await userEvent.type(passwordInput, 'password123');
  await userEvent.click(loginButton);

  // Wait for navigation to be called
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/user/12345');
  });
});

test('shows error message on failed login', async () => {
  // Mock fetch API to return an error response
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: false,
      json: () =>
        Promise.resolve({
          message: 'Invalid credentials',
        }),
    })
  );

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  // Simulate user interactions
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });

  await userEvent.type(emailInput, 'wrong@example.com');
  await userEvent.type(passwordInput, 'wrongpassword');
  await userEvent.click(loginButton);

  // Check for error message
  const errorMessage = await screen.findByText(/invalid credentials/i);
  expect(errorMessage).toBeInTheDocument();
});
