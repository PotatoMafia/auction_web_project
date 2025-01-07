
import AdminAuctionList from './AdminAuctionList';
import AdminAuctionForm from './AdminAuctionForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
    const [token] = useState(localStorage.getItem('adminToken'));
    const navigate = useNavigate();

    useEffect(() => {
        const decodeToken = () => {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                if (typeof decoded.sub !== 'object') {
                    throw new Error('Uncorrect Type of Format');
                }
                return decoded;
            } catch (error) {
                console.error('Error of the token decoding :', error);
                return null;
            }
        };


        const userInfo = decodeToken(token);
        console.log('Token:', token);
        console.log('Decoded User Info:', userInfo); // Log decoded user info for verification

        // Sprawdzanie roli użytkownika
        if (!token || (userInfo && userInfo.sub.role !== 'admin')) {
            alert('Brak uprawnień. Zaloguj się jako administrator.');
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <div>
            <h1>Panel Administracyjny</h1>
            {token && (
                <>
                    <AdminAuctionList token={token} onSelectAuction={() => {}} />
                    <AdminAuctionForm token={token} selectedAuction={null} />
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
