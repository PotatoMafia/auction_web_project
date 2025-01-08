import { useEffect, useState } from 'react';
import { getAuctions } from '../api/admin';

// eslint-disable-next-line react/prop-types
const AdminAuctionList = ({ token, onSelectAuction }) => {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                setLoading(true);
                const data = await getAuctions(token);
                console.log('Fetched auctions:', data); // Debug log
                setAuctions(data);
            } catch (err) {
                console.error('Error fetching auctions:', err);
                setError('Wystąpił błąd podczas pobierania aukcji.');
            } finally {
                setLoading(false);
            }
        };

        fetchAuctions();
    }, [token]);

    if (loading) {
        return <p>Ładowanie aukcji...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (auctions.length === 0) {
        return <p>Brak dostępnych aukcji.</p>;
    }

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
