import { useEffect, useState } from 'react';
import { getAuctions } from '../api/admin';

// eslint-disable-next-line react/prop-types
const AdminAuctionList = ({ token, onSelectAuction }) => {
    const [auctions, setAuctions] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminRole = () => {
            try {
                // eslint-disable-next-line react/prop-types
                const decoded = JSON.parse(atob(token.split('.')[1]));
                if (decoded.sub && decoded.sub.role === 'admin'){
                    setIsAdmin(true);
                } else {
                    alert('Brak uprawnień. Zaloguj się jako administrator.');
                }
            } catch (error) {
                console.error('Błąd dekodowania tokena:', error);
                alert('Błąd uwierzytelniania.');
            }
        };

        checkAdminRole();
    }, [token]);

    useEffect(() => {
        if (isAdmin) {
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
    }, [isAdmin, token]);

    if (!isAdmin) {
        return null;
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
