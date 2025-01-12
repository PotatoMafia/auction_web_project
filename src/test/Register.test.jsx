import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Register from '../component/Register';
import { registerUser } from '../api';

// Mock the `registerUser` API function
vi.mock('../api', () => ({
    registerUser: vi.fn(),
}));

// Mock `useNavigate` from `react-router-dom`
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

const mockNavigate = vi.fn();

beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
    useNavigate.mockReturnValue(mockNavigate); // Set mock return value
});

describe('Register Component', () => {
    test('renders the registration form', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    test('handles input changes', async () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText(/email/i);
        const usernameInput = screen.getByPlaceholderText(/username/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'password123');

        expect(emailInput).toHaveValue('test@example.com');
        expect(usernameInput).toHaveValue('testuser');
        expect(passwordInput).toHaveValue('password123');
    });

    test('calls registerUser API', async () => {
        registerUser.mockResolvedValueOnce();

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText(/email/i);
        const usernameInput = screen.getByPlaceholderText(/username/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const registerButton = screen.getByRole('button', { name: /register/i });

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'password123');

        fireEvent.click(registerButton);

        expect(registerUser).toHaveBeenCalledWith({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
        });

    });

    test('displays an error message on API failure', async () => {
        registerUser.mockRejectedValueOnce(new Error('Registration failed'));

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText(/email/i);
        const usernameInput = screen.getByPlaceholderText(/username/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const registerButton = screen.getByRole('button', { name: /register/i });

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'password123');

        fireEvent.click(registerButton);

        const errorMessage = await screen.findByText(/Nieudalo sie zarejestrowac/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
