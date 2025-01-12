import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import UserDashboard from '../component/UserDashboard';
import AuctionList from '../component/AuctionList';

// Mock `AuctionList` to control its behavior
vi.mock('../component/AuctionList', () => ({
  default: ({ onSelectAuction }) => (
    <div>
      <button onClick={() => onSelectAuction('123')}>Select Auction</button>
    </div>
  ),
}));

// Partially mock `react-router-dom`
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom'); // Import actual module
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock `useNavigate`
  };
});

const mockNavigate = vi.fn();

beforeEach(() => {
  vi.clearAllMocks(); // Clear all mocks before each test
  useNavigate.mockReturnValue(mockNavigate); // Set mock return value
});

test('renders auction list when token is valid', () => {
  // Add a valid token to localStorage
  const validToken = btoa(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 60 * 60 }) // Token valid for 1 hour
  );
  localStorage.setItem('token', `header.${validToken}.signature`);

  render(
    <BrowserRouter>
      <UserDashboard />
    </BrowserRouter>
  );

  expect(screen.getByText(/panel aukcyjny/i)).toBeInTheDocument();
  expect(screen.getByText(/select auction/i)).toBeInTheDocument();
});

test('calls navigate with auction ID when an auction is selected', async () => {
  // Add a valid token to localStorage
  const validToken = btoa(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 60 * 60 }) // Token valid for 1 hour
  );
  localStorage.setItem('token', `header.${validToken}.signature`);

  render(
    <BrowserRouter>
      <UserDashboard />
    </BrowserRouter>
  );

  const selectAuctionButton = screen.getByText(/select auction/i);
  await userEvent.click(selectAuctionButton);

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/auction/123');
  });
});
