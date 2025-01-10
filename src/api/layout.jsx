import TopBar from '../component/TopBar';
import '../styles/logout.css';

// eslint-disable-next-line react/prop-types
const Layout = ({ children, onLogout, onLogin}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
            }}
        >
            <TopBar onLogout={onLogout} onLogin={onLogin} />
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#e9ecef',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Layout;
