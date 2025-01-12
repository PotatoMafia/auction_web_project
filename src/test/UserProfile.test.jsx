import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { BrowserRouter, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../component/UserProfile';

vi.mock('axios', async () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
    },
  };
});

vi.mock('../config.js', () => ({
  API_URL: 'http://mockapi.com',
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

const mockNavigate = vi.fn();

beforeEach(() => {
  axios.get.mockClear();
  axios.post.mockClear();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);
});

describe('UserProfile Component', () => {
  test('renders user data, bids, and transactions correctly', async () => {
    vi.mocked(useParams).mockReturnValue({ userId: '123' });

    // Mock API responses
    axios.get.mockImplementation((url) => {
      if (url === 'http://mockapi.com/user/123') {
        return Promise.resolve({ data: { email: 'test@example.com', username: 'testuser', role: 'user' } });
      }
      if (url === 'http://mockapi.com/user/123/bids') {
        return Promise.resolve({
          data: [
            { bid_id: 1, auction_id: 101, bid_price: 50, bid_time: new Date().toISOString() },
          ],
        });
      }
      if (url === 'http://mockapi.com/user/123/transactions') {
        return Promise.resolve({
          data: [
            { transaction_id: 1, auction_id: 101, payment_status: 'Completed', transaction_time: new Date().toISOString() },
          ],
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });

    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Email: test@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/Nick: testuser/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/ID aukcji: 101, Oferta: \$50/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/ID aukcji: 101, Stan Oplaty: Completed/i)).toBeInTheDocument();
    });
  });
});
