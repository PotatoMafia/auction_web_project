import { useEffect, useState } from 'react'; // Import React hooks
import { useNavigate } from 'react-router-dom'; // Import navigate function for routing
import '../styles/logout.css'; // Import CSS file for styling

// eslint-disable-next-line react/prop-types
const TopBar = ({ onLogout, onLogin }) => {
    const navigate = useNavigate(); // Initialize the navigate function for routing
    const [logged, setLogged] = useState([]); // State to track if the user is logged in
    const [token] = useState(localStorage.getItem('token')); // Retrieve token from localStorage
    const [user_id] = useState(localStorage.getItem('userId')); // Retrieve userId from localStorage
    const zalogowany = logged; // Variable to track the logged-in status

    // Function to check if the token is valid (not expired)
    const isTokenValid = (token) => {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
            return decoded.exp * 1000 > Date.now(); // Compare expiration time to current time
        } catch {
            return false; // Return false if token decoding fails
        }
    };

    // useEffect hook to check token validity when token changes
    useEffect(() => {
        if (!token || !isTokenValid(token)) {
            setLogged(false); // Set logged state to false if token is invalid
        } else {
            setLogged(true); // Set logged state to true if token is valid
        }
    }, [token]); // Dependency array to re-run when token changes

    // Handle logout process: clear localStorage and call the onLogout function
    const handleLogout = () => {
        localStorage.clear(); // Clear localStorage
        onLogout(); // Call the onLogout callback function
    };

    // Handle login process: clear localStorage and call the onLogin function
    const handleLogin = () => {
        localStorage.clear(); // Clear localStorage
        onLogin(); // Call the onLogin callback function
    };

    // Navigate to the home page
    const goToHome = () => {
        navigate('/'); // Navigate to the home route
    };

    // Navigate to the user dashboard page
    const goToUserDashboard = () => {
        navigate('/dashboard'); // Navigate to the user dashboard route
    };

    // Navigate to the user profile page if logged in
    const goToUserPanel = () => {
        if (zalogowany) {
            console.log('Navigating to UserPanel for userId:', user_id); // Log the userId to console
            navigate(`/user/${user_id}`); // Navigate to the user profile page with the userId
        } else {
            console.log('UserId is not available'); // Log if userId is not available
        }
    };

    return (
        <div
            style={{
                display: 'flex', // Use flexbox for layout
                justifyContent: 'space-between', // Space out elements in the top bar
                alignItems: 'center', // Vertically align items in the center
                padding: '10px 20px', // Add padding around the top bar
                backgroundColor: '#f8f9fa', // Light background color
                borderBottom: '1px solid #ddd', // Add a border at the bottom of the top bar
            }}
        >
            <h2 style={{ margin: 0 }}>Panel</h2> {/* Display the title of the panel */}
            <div style={{ display: 'flex', gap: '15px' }}> {/* Flexbox layout for the buttons */}
                <button onClick={goToHome} style={buttonStyle}> {/* Navigate to home */}
                    Home
                </button>
                {zalogowany && ( 
                    <button onClick={goToUserPanel} style={buttonStyle}> {/* Navigate to user panel if logged in */}
                        Panel Uzytkownika
                    </button>
                )}
                {zalogowany && (
                    <button onClick={goToUserDashboard} style={buttonStyle}> {/* Navigate to auction dashboard if logged in */}
                        Lista Aukcji
                    </button>
                )}
                <button
                    className={zalogowany ? 'logout-button' : 'loginn-button'} // Apply different class based on login status
                    onClick={zalogowany ? handleLogout : handleLogin} // Call appropriate function based on login status
                    style={buttonStyle}
                >
                    {zalogowany ? 'Logout' : 'Login'} {/* Display 'Logout' if logged in, 'Login' otherwise */}
                </button>
            </div>
        </div>
    );
};

// Styles for the buttons
const buttonStyle = {
    padding: '8px 15px', // Button padding
    borderRadius: '5px', // Rounded corners
    border: 'none', // Remove border
    backgroundColor: '#46ffd9', // Light greenish background color
    color: '#000', // Black text color
    cursor: 'pointer', // Pointer cursor on hover
    fontWeight: 'bold', // Bold font
    fontSize: '0.75rem', // Smaller font size
    display: 'flex', // Flexbox layout for center alignment
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
};

export default TopBar;
