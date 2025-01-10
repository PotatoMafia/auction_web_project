import 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/logout.css';

// eslint-disable-next-line react/prop-types
const TopBar = ({ onLogout, onLogin }) => {
    const navigate = useNavigate();
     const [logged, setlogged] = useState([]);
     const [token] = useState(localStorage.getItem('token'));
     const zalogowany = logged;

    const isTokenValid = (token) => {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.exp * 1000 > Date.now(); // Check expiration timestamp
        } catch {
            return false;
        }
    };

     useEffect(() => {
                if (!token || !isTokenValid(token)) {
                    setlogged(false);
                }
                else{
                    setlogged(true);
                }
            }, [token]);

    const handleLogout = () => {
        localStorage.clear();
        //navigate('/');
        onLogout();
    };

    const handleLogin = () => {
        localStorage.clear();
        //navigate('/login');
        onLogin();
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #ddd',

            }}
        >
            <h2 style={{ margin: 0 }}>Panel</h2>
            <button
                className={zalogowany ? "logout-button": "loginn-button"}
                onClick={zalogowany ? handleLogout : handleLogin}
            >
                 {zalogowany ? 'Logout' : 'Login'}
            </button>
        </div>
    );
};

export default TopBar;


