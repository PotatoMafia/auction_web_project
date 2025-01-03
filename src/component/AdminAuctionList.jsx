import { useEffect, useState } from 'react';
import { getAuctions } from '../api/admin';

// eslint-disable-next-line react/prop-types
const AdminAuctionList = ({ token, onSelectAuction }) => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
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
    }, [token]);

    return (
        <div>
            <h2>Lista Aukcji</h2>
            <ul>
                {auctions.map((auction) => (
                    <li key={auction.auction_id}>
                        <strong>{auction.title}</strong> — {auction.description}
                        <button onClick={() => onSelectAuction(auction)}>Edytuj</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminAuctionList;
