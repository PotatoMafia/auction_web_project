import axios from 'axios';
import { vi } from 'vitest';
import { getAuctions, placeBid, createAuction } from '../api/user'; // Ścieżka do funkcji
import MockAdapter from 'axios-mock-adapter';
import { API_URL } from '../config.js';

// Tworzymy instancję mocka dla axiosa
const mock = new MockAdapter(axios);

describe('API Functions', () => {
  afterEach(() => {
    // Resetowanie mocka po każdym teście
    mock.reset();
  });

  it('should fetch auctions successfully', async () => {
    const token = 'mockToken';
    const mockResponse = [
      { auction_id: 1, title: 'Aukcja 1', description: 'Opis aukcji 1' },
      { auction_id: 2, title: 'Aukcja 2', description: 'Opis aukcji 2' }
    ];

    // Mockowanie odpowiedzi GET /auctions
    mock.onGet(`${API_URL}/auctions`).reply(200, mockResponse);

    // Wywołanie funkcji getAuctions
    const result = await getAuctions(token);

    // Sprawdzamy, czy odpowiedź jest taka, jakiej się spodziewamy
    expect(result).toEqual(mockResponse);
  });

  it('should throw error if fetching auctions fails', async () => {
    const token = 'mockToken';

    // Mockowanie błędnej odpowiedzi
    mock.onGet(`${API_URL}/auctions`).reply(500);

    // Sprawdzamy, czy funkcja wyrzuci wyjątek przy błędzie
    await expect(getAuctions(token)).rejects.toThrow();
  });

  it('should place a bid successfully', async () => {
    const token = 'mockToken';
    const bidData = { auction_id: 1, bid_price: 150 };
    const mockResponse = { bid_id: 1, status: 'success' };

    // Mockowanie odpowiedzi POST /bid
    mock.onPost(`${API_URL}/bid`).reply(200, mockResponse);

    // Wywołanie funkcji placeBid
    const result = await placeBid(bidData, token);

    // Sprawdzamy, czy odpowiedź jest zgodna z oczekiwaną
    expect(result).toEqual(mockResponse);
  });

  it('should create an auction successfully', async () => {
    const token = 'mockToken';
    const start_time = '2023-01-01 10:00';
    const end_time = '2023-01-10 10:00';
    const start_price = 100;
    const user_id = 'user123';
    const title = 'Nowa Aukcja';
    const description = 'Opis nowej aukcji';
    const image = null; // Zakładamy, że nie ma obrazu
    const mockResponse = { auction_id: 1, title };

    // Mockowanie odpowiedzi POST /auctions
    mock.onPost(`${API_URL}/auctions`).reply(200, mockResponse);

    // Wywołanie funkcji createAuction
    const result = await createAuction(
      token,
      start_time,
      end_time,
      start_price,
      user_id,
      title,
      description,
      image
    );

    // Sprawdzamy, czy odpowiedź jest zgodna z oczekiwaną
    expect(result).toEqual(mockResponse);
  });

  it('should throw error if creating an auction fails', async () => {
    const token = 'mockToken';
    const start_time = '2023-01-01 10:00';
    const end_time = '2023-01-10 10:00';
    const start_price = 100;
    const user_id = 'user123';
    const title = 'Nowa Aukcja';
    const description = 'Opis nowej aukcji';
    const image = null; // Zakładamy, że nie ma obrazu

    // Mockowanie błędnej odpowiedzi
    mock.onPost(`${API_URL}/auctions`).reply(500);

    // Sprawdzamy, czy funkcja wyrzuci wyjątek przy błędzie
    await expect(
      createAuction(token, start_time, end_time, start_price, user_id, title, description, image)
    ).rejects.toThrow();
  });
});
