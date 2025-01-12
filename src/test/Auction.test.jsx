import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Auction from '../component/Auction';
import { API_URL } from '../config.js';

describe('Auction Component', () => {
  it('should render auction details correctly', () => {
    // Przykładowe dane dla aukcji
    const auctionData = {
      auction_id: 1,
      title: 'Aukcja 1',
      description: 'Opis aukcji 1',
      start_time: '2023-01-01 10:00',
      end_time: '2023-01-10 10:00',
      starting_price: 100,
      status: 'active',
      user_id: 'user123',
      image_url: 'auction_image.jpg',
    };

    // Renderowanie komponentu Auction
    render(<Auction {...auctionData} />);

    // Sprawdzanie, czy wszystkie dane aukcji są wyświetlane
    expect(screen.getByText('Tytuł: Aukcja 1')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Status: active')).toBeInTheDocument();
    expect(screen.getByText('Cena wywoławcza: 100')).toBeInTheDocument();
    expect(screen.getByText('Użytkownik: user123')).toBeInTheDocument();
    expect(screen.getByText('Start Aukcji:2023-01-01 10:00')).toBeInTheDocument();
    expect(screen.getByText('Koniec Aukcji:2023-01-10 10:00')).toBeInTheDocument();
    expect(screen.getByText('Szczegóły: Opis aukcji 1')).toBeInTheDocument();

    // Sprawdzanie, czy obrazek jest wyświetlany
    expect(screen.getByRole('img')).toHaveAttribute('src', `${API_URL}/imagesForAuctions/auction_image.jpg`);
  });

  it('should display "No image" if image_url is not provided', () => {
    // Przykładowe dane aukcji bez obrazu
    const auctionDataWithoutImage = {
      auction_id: 1,
      title: 'Aukcja 1',
      description: 'Opis aukcji 1',
      start_time: '2023-01-01 10:00',
      end_time: '2023-01-10 10:00',
      starting_price: 100,
      status: 'active',
      user_id: 'user123',
      image_url: null,  // Brak obrazu
    };

    // Renderowanie komponentu Auction bez obrazu
    render(<Auction {...auctionDataWithoutImage} />);

    // Sprawdzamy, czy tekst "No image" jest wyświetlany
    expect(screen.getByText('No image')).toBeInTheDocument();
  });

  it('should call onCheck when "Sprawdz aukcje" button is clicked', () => {
    // Przygotowanie funkcji mock
    const onCheckMock = vi.fn();

    // Przykładowe dane aukcji
    const auctionData = {
      auction_id: 1,
      title: 'Aukcja 1',
      description: 'Opis aukcji 1',
      start_time: '2023-01-01 10:00',
      end_time: '2023-01-10 10:00',
      starting_price: 100,
      status: 'active',
      user_id: 'user123',
      image_url: 'auction_image.jpg',
    };

    // Renderowanie komponentu z funkcją mock
    render(<Auction {...auctionData} onCheck={onCheckMock} />);

    // Kliknięcie w przycisk "Sprawdz aukcje"
    fireEvent.click(screen.getByText('Sprawdz aukcje'));

    // Sprawdzanie, czy funkcja onCheck została wywołana z odpowiednim argumentem
    expect(onCheckMock).toHaveBeenCalledWith(1);
  });
});
