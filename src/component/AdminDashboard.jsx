import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAuctionList from './AdminAuctionList';
import AdminAuctionForm from './AdminAuctionForm';
import '../styles/style.css'
import { fetchAuctions } from '../api/admin';

const isTokenValid = (token) => {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.exp * 1000 > Date.now(); // Check expiration timestamp
    } catch {
        return false;
    }
};

const AdminDashboard = () => {
    const [token] = useState(localStorage.getItem('token'));
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [auctions, setAuctions] = useState([]);
    const [, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !isTokenValid(token) || localStorage.getItem('role') !== 'admin') {
            alert('Brak uprawnień lub token wygasł. Zaloguj się ponownie.');
            navigate('/login');
            localStorage.clear();
        } else {
            loadAuctions();
            setLoading(false);
        }
    }, [token, navigate]);

    const loadAuctions = async () => {
        try {
            const data = await fetchAuctions(token);
            setAuctions(data);
        } catch (error) {
            console.error('Błąd pobierania aukcji:', error);
        }
    };

    const handleSelectAuction = (auction) => {
        setSelectedAuction(auction);
    };

    return (
        <div className="scrollable-container">
            <h1>Panel Administracyjny</h1>
            {token ? (
                <>
                    <AdminAuctionList
                        token={token}
                        auctions={auctions}
                        onSelectAuction={handleSelectAuction}
                    />
                    <AdminAuctionForm
                        token={token}
                        selectedAuction={selectedAuction}
                        onAuctionUpdated={loadAuctions}
                    />
                </>
            ) : (
                <p>Ładowanie panelu...</p>
            )}
        </div>
    );
};

export default AdminDashboard;
