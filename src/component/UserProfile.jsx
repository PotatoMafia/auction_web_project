import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import { API_URL } from '../config.js';

const UserProfile = () => {
    // Get userId from URL parameters
    const { userId } = useParams();
    // Hook for navigation (redirecting to other pages)
    const navigate = useNavigate();
    
    // Define state variables (useState) for storing user data, bids, and transactions
    const [userData, setUserData] = useState(null);
    const [bids, setBids] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [email] = useState('');
    const [password] = useState('');

    // useEffect - runs after the component is mounted or if userId changes
    useEffect(() => {
        const fetchUserData = async () => {
            // If no userId, redirect to login page
            if (!userId) {
                navigate('/login');
                return;
            }
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('token');
                
                // Make an API request to fetch the user's data
                const userResponse = await axios.get(`${API_URL}/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(userResponse.data);

                // Fetch the user's bids
                const bidsResponse = await axios.get(`${API_URL}/user/${userId}/bids`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBids(bidsResponse.data);

                // Fetch the user's transactions
                const transactionsResponse = await axios.get(`${API_URL}/user/${userId}/transactions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTransactions(transactionsResponse.data);
            } catch (error) {
                // Log error if there is an issue fetching data
                console.error('Error fetching user data:', error);
            }
        };

        // Call the function to fetch user data
        fetchUserData();
    }, [userId, navigate]); // Re-run the effect if userId or navigate change

    // Login function - sends user credentials to the server for login
    async () => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            const loggedInUserId = response.data.user_id;
            navigate(`/user/${loggedInUserId}`); // Redirect to the logged-in user's profile page
        } catch (error) {
            // Handle login error
            console.error('Login error:', error);
            alert('Failed to log in. Please try again.');
        }
    };

    // Function to handle access to the admin panel
    const handleAdminAccess = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // If token is missing, show an alert and clear localStorage
                alert('Token is missing. Please log in again.');
                localStorage.clear();
                return;
            }

            // Make an API request to get access to the admin panel
            const response = await axios.get(`${API_URL}/admin`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert(response.data.message); // Show message from the API
            navigate('/admin'); // Redirect to the admin panel
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'An error occurred';
            alert(`Admin access error: ${errorMessage}`); // Show error message if there is an issue
            console.error('Admin access error:', errorMessage);
        }
    };

    return (
        <div className="centered-container">
            <div className="profile-container">
                <h2>Profil uzytkownika</h2>
                {userData ? (
                    <div>
                        {/* Display user data */}
                        <p>Email: {userData.email}</p>
                        <p>Nick: {userData.username}</p>
                        <p>Rola: {userData.role}</p>
                        {userData.role === 'admin' && (
                            <button onClick={handleAdminAccess}>Przejdz do panelu admina</button> 
                            // If the user has 'admin' role, display the button to go to the admin panel
                        )}
                    </div>
                ) : null}

                <h3>Historia twoich ofert</h3>
                {bids.length > 0 ? (
                    <ul>
                        {bids.map((bid) => (
                            <li key={bid.bid_id}>
                                {/* Display bidding history */}
                                <p>
                                    ID aukcji: {bid.auction_id}, Oferta: ${bid.bid_price},
                                    Czas: {new Date(bid.bid_time).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nie znaleziono twoich ofert.</p> // If no bids, display a message
                )}

                <h3>Historia Tranzakcji</h3>
                {transactions.length > 0 ? (
                    <ul>
                        {transactions.map((transaction) => (
                            <li key={transaction.transaction_id}>
                                {/* Display transaction history */}
                                <p>
                                    ID Aukcji: {transaction.auction_id}, Stan oplaty: {transaction.payment_status},
                                    Czas: {new Date(transaction.transaction_time).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nie znaleziono tranzakcji.</p> // If no transactions, display a message
                )}
            </div>
        </div>
    );
};

export default UserProfile;
