import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/logout.css';

// eslint-disable-next-line react/prop-types
const TopBar = ({ onLogout, onLogin }) => {
    const navigate = useNavigate();
    const [logged, setLogged] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [user_id] = useState(localStorage.getItem('userId'));
    const zalogowany = logged;

    const isTokenValid = (token) => {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    };

    useEffect(() => {
        if (!token || !isTokenValid(token)) {
            setLogged(false);
        } else {
            setLogged(true);
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.clear();
        onLogout();
    };

    const handleLogin = () => {
        localStorage.clear();
        onLogin();
    };

    const goToHome = () => {
        navigate('/');
    };
    const goToUserDashboard = () => {
        navigate('/dashboard');
    };

    const goToUserPanel = () => {
        if (zalogowany) {
            console.log('Navigating to UserPanel for userId:', user_id);
            navigate(`/user/${user_id}`);
        } else {
            console.log('UserId is not available');
        }
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
            <div style={{ display: 'flex', gap: '15px' }}>
                <button onClick={goToHome} style={buttonStyle}>
                    Home
                </button>
                {zalogowany && (
                    <button onClick={goToUserPanel} style={buttonStyle}>
                        UserPanel
                    </button>
                )}
                {zalogowany && (
                    <button onClick={goToUserDashboard} style={buttonStyle}>
                        Auction Board
                    </button>
                )}
                <button
                    className={zalogowany ? 'logout-button' : 'loginn-button'}
                    onClick={zalogowany ? handleLogout : handleLogin}
                    style={buttonStyle}
                >
                    {zalogowany ? 'Logout' : 'Login'}
                </button>
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: '8px 15px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#46ffd9',
    color: '#000',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export default TopBar;
