import { render, screen } from '@testing-library/react';
import Bid from '../component/Bid'; // Zakładając, że komponent Bid jest w folderze components

describe('Bid Component', () => {
  it('renders bid information correctly', () => {
    // Definiowanie przykładowych danych
    const auction_id = 1;
    const bid_price = 1000;
    const bid_time = '2025-01-12T12:34:56Z';
    const user_id = 'user123';

    // Renderowanie komponentu z odpowiednimi propsami
    render(<Bid auction_id={auction_id} bid_price={bid_price} bid_time={bid_time} user_id={user_id} />);

    // Sprawdzanie, czy dane są poprawnie wyświetlane w tekście
    expect(screen.getByText(`Użytkownik: ${user_id} - Kwota: ${bid_price} - Czas: ${bid_time}`)).toBeInTheDocument();
  });
});
