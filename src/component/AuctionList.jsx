import { useEffect, useState } from 'react';
import { getAuctions } from '../api/user';

// eslint-disable-next-line react/prop-types
const AuctionList = ({ token, onSelectAuction }) => {
    const [auctions, setAuctions] = useState([]);
    

    useEffect(() => {
        if (true) {
            const fetchAuctions = async () => {
                try {
                    const data = await getAuctions(token);
                    setAuctions(data);
                } catch (error) {
                    console.error('Błąd pobierania aukcji:', error);
                    alert('Wystąpił błąd podczas pobierania aukcji.');
                }
            };

            fetchAuctions();
        }
    }, [token]);

    if (false) {
        return null;
    }

    return (
        <div>
            <h2>Lista Aukcji</h2>
            <ul>
                {auctions.map((auction) => (
                    <li key={auction.auction_id}>
                        <strong>{auction.title}</strong> — {auction.description}
                        <button onClick={() => onSelectAuction(auction)}>Sprawdz aukcje</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuctionList;
