import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { BrowserRouter, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import AuctionDetails from '../component/AuctionDetails';

// Mock `useParams` and `useNavigate`
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

// Mock `axios`
vi.mock('axios');

const mockNavigate = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  useParams.mockReturnValue({ auctionId: '123' }); // Mock auctionId param
  useNavigate.mockReturnValue(mockNavigate); // Mock navigate function
});

test('redirects to login if token is missing', () => {
  localStorage.removeItem('token'); // Simulate missing token

  render(
    <BrowserRouter>
      <AuctionDetails />
    </BrowserRouter>
  );

  expect(mockNavigate).toHaveBeenCalledWith('/login');
});

test('redirects to login if token is invalid', () => {
  const expiredToken = btoa(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 60 })
  );
  localStorage.setItem('token', `header.${expiredToken}.signature`);

  render(
    <BrowserRouter>
      <AuctionDetails />
    </BrowserRouter>
  );

  expect(mockNavigate).toHaveBeenCalledWith('/login');
});

