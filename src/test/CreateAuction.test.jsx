import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import CreateAuction from '../component/CreateAuction';
import { createAuction } from '../api/user';

// Mock the `createAuction` API function
vi.mock('../api/user', () => ({
  createAuction: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => mockNavigate),
  };
});

const mockNavigate = vi.fn();

beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'token') return 'mock-token';
    if (key === 'userId') return 'mock-userId';
    return null;
  });

  vi.clearAllMocks();
  mockNavigate.mockClear();
});

describe('CreateAuction Component', () => {
  test('renders the form correctly', () => {
    render(
      <BrowserRouter>
        <CreateAuction />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/starting price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload image/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('calls createAuction API and navigates on successful submission', async () => {
    createAuction.mockResolvedValueOnce();

    render(
      <BrowserRouter>
        <CreateAuction />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const startPriceInput = screen.getByLabelText(/starting price/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(titleInput, 'Auction Title');
    await userEvent.type(descriptionInput, 'This is a description.');
    await userEvent.type(startPriceInput, '123.45');

    fireEvent.click(submitButton);

    expect(createAuction).toHaveBeenCalledWith(
      'mock-token',
      expect.any(String),
      expect.any(String),
      123.45,
      'mock-userId',
      'Auction Title',
      'This is a description.',
      null
    );
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('alerts and navigates on successful submission', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    createAuction.mockResolvedValueOnce();

    render(
      <BrowserRouter>
        <CreateAuction />
      </BrowserRouter>
    );

    await userEvent.type(screen.getByLabelText(/title/i), 'Auction Title');
    await userEvent.type(screen.getByLabelText(/description/i), 'This is a description.');
    await userEvent.type(screen.getByLabelText(/starting price/i), '123.45');


    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('Auction submitted successfully!');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
