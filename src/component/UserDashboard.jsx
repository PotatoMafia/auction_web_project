
import AuctionList from './AuctionList';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateAuction from './CreateAuction';

const isTokenValid = (token) => {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.exp * 1000 > Date.now(); // Check expiration timestamp
    } catch {
        return false;
    }
};


const UserDashboard = () => {
    const [token] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

        useEffect(() => {
            if (!token || !isTokenValid(token)) {
                alert('Brak uprawnień lub token wygasł. Zaloguj się ponownie.');
                navigate('/login');
            }
        }, [token, navigate]);

        function CheckDetails(id){
            console.log('Selected auction:', id);
            navigate(`/auction/${id}`);
        }

    return (
        <div>
            <h1>Panel Aukcyjny</h1>
            {token && (
                <>
                    <AuctionList token={token} onSelectAuction={(auction_id) => {CheckDetails(auction_id)}} />
                </>
            )}
        </div>
    );
};

export default UserDashboard;
