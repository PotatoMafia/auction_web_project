import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import { API_URL } from '../config.js';

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [bids, setBids] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [email] = useState('');
    const [password] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                navigate('/login');
                return;
            }
            try {
                const token = localStorage.getItem('token');
                const userResponse = await axios.get(`${API_URL}/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(userResponse.data);

                // Fetch user bids
                const bidsResponse = await axios.get(`${API_URL}/user/${userId}/bids`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBids(bidsResponse.data);

                // Fetch user transactions
                const transactionsResponse = await axios.get(`${API_URL}/user/${userId}/transactions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTransactions(transactionsResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId, navigate]);

    async () => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            const loggedInUserId = response.data.user_id;
            navigate(`/user/${loggedInUserId}`);
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to log in. Please try again.');
        }
    };

    const handleAdminAccess = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Token is missing. Please log in again.');
                localStorage.clear();
                return;
            }

            const response = await axios.get(`${API_URL}/admin`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert(response.data.message);
            navigate('/admin');
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'An error occurred';
            alert(`Admin access error: ${errorMessage}`);
            console.error('Admin access error:', errorMessage);
        }
    };

    return (
        <div className="centered-container">
            <div className="profile-container">
                <h2>User Profile</h2>
                {userData ? (
                    <div>
                        <p>Email: {userData.email}</p>
                        <p>Username: {userData.username}</p>
                        <p>Role: {userData.role}</p>
                        {userData.role === 'admin' && (
                            <button onClick={handleAdminAccess}>Go to Admin Panel</button>
                        )}
                    </div>
                ) : null}

                <h3>Bidding History</h3>
                {bids.length > 0 ? (
                    <ul>
                        {bids.map((bid) => (
                            <li key={bid.bid_id}>
                                <p>
                                    Auction ID: {bid.auction_id}, Bid: ${bid.bid_price},
                                    Time: {new Date(bid.bid_time).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bids found.</p>
                )}

                <h3>Transaction History</h3>
                {transactions.length > 0 ? (
                    <ul>
                        {transactions.map((transaction) => (
                            <li key={transaction.transaction_id}>
                                <p>
                                    Auction ID: {transaction.auction_id}, Payment Status: {transaction.payment_status},
                                    Time: {new Date(transaction.transaction_time).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;