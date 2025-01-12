import AuctionList from './AuctionList'; // Import AuctionList component
import { useEffect, useState } from 'react'; // Import hooks
import { useNavigate } from 'react-router-dom'; // Import navigate function for routing

// Function to validate the token (check if it's not expired)
const isTokenValid = (token) => {
    try {
        // Decode JWT token to get payload and check expiration time
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.exp * 1000 > Date.now(); // Check expiration timestamp
    } catch {
        // If decoding fails, return false
        return false;
    }
};

const UserDashboard = () => {
    // Retrieve token from localStorage
    const [token] = useState(localStorage.getItem('token'));
    // Initialize the useNavigate hook to navigate between pages
    const navigate = useNavigate();

    // useEffect hook to check token validity on component mount or token change
    useEffect(() => {
        // If no token or token is invalid, redirect to login page with an alert
        if (!token || !isTokenValid(token)) {
            alert('Brak uprawnień lub token wygasł. Zaloguj się ponownie.'); // Alert in case of missing or expired token
            navigate('/login'); // Navigate to login page
        }
    }, [token, navigate]); // Dependencies - effect runs when token or navigate changes

    // Function to handle auction selection and navigate to auction details page
    function CheckDetails(id) {
        console.log('Selected auction:', id); // Log the selected auction ID to console
        navigate(`/auction/${id}`); // Navigate to the auction details page with selected auction ID
    }

    return (
        <div style={{ height: '100vh', overflowY: 'auto' }}>
            {/* Display the dashboard heading */}
            <h1>Panel Aukcyjny</h1>

            {token && (
                <>
                    {/* If a valid token exists, render AuctionList component */}
                    <AuctionList 
                        token={token} // Pass the token to AuctionList component
                        onSelectAuction={(auction_id) => { CheckDetails(auction_id) }} // Pass a function to handle auction selection
                    />
                </>
            )}
        </div>
    );
};

export default UserDashboard;
