
import AuctionList from './AuctionList';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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


        
        //console.log('Token:', token);
        //console.log('Decoded User Info:', userInfo); // Log decoded user info for verification

        // Sprawdzanie roli użytkownika
        //if (!token || (userInfo && userInfo.sub.role !== 'user')) {
        //    alert('Brak uprawnień. Zaloguj się.');
        //    navigate('/login');
        //}
    

    return (
        <div>
            <h1>Panel Aukcyjny</h1>
            {token && (
                <>
                    <AuctionList token={token} onSelectAuction={() => {}} />
                </>
            )}
        </div>
    );
};

export default UserDashboard;
