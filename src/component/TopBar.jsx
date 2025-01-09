import 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/logout.css';

// eslint-disable-next-line react/prop-types
const TopBar = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        onLogout();
        navigate('/login');
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
                className="logout-button"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default TopBar;
