import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAuctionList from './AdminAuctionList';
import AdminAuctionForm from './AdminAuctionForm';

// Helper function to validate token
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
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !isTokenValid(token)) {
            alert('Brak uprawnień lub token wygasł. Zaloguj się ponownie.');
            navigate('/login');
        }
    }, [token, navigate]);

    const handleSelectAuction = (auction) => {
        console.log('Selected auction:', auction); // Debug log
        setSelectedAuction(auction);
    };

    return (
        <div>
            <h1>Panel Administracyjny</h1>
            {token ? (
                <>
                    <AdminAuctionList token={token} onSelectAuction={handleSelectAuction} />
                    <AdminAuctionForm token={token} selectedAuction={selectedAuction} />
                </>
            ) : (
                <p>Ładowanie panelu...</p>
            )}
        </div>
    );
};

export default AdminDashboard;
