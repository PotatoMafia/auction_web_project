import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAuctionList from './AdminAuctionList';
import AdminAuctionForm from './AdminAuctionForm';
import { fetchAuctions } from '../api/admin'; // Функция для получения списка аукционов

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
    const [auctions, setAuctions] = useState([]); // Список аукционов
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !isTokenValid(token)) {
            alert('Brak uprawnień lub token wygasł. Zaloguj się ponownie.');
            navigate('/login');
        } else {
            // loadAuctions();
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
        <div>
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
                        onAuctionUpdated={loadAuctions} // Передаем функцию обновления
                    />
                </>
            ) : (
                <p>Ładowanie panelu...</p>
            )}
        </div>
    );
};

export default AdminDashboard;
