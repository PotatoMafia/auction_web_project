import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [bids, setBids] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {

                navigate('/login');
                return;
            }
            try {
                const token = localStorage.getItem('token');
                const userResponse = await axios.get(`http://127.0.0.1:5000/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(userResponse.data);

                // Fetch user bids
                const bidsResponse = await axios.get(`http://127.0.0.1:5000/user/${userId}/bids`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBids(bidsResponse.data);

                // Fetch user transactions
                const transactionsResponse = await axios.get(`http://127.0.0.1:5000/user/${userId}/transactions`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTransactions(transactionsResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId, navigate]);

    // const handleLogin = async () => {
    //     try {
    //         const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
    //         localStorage.setItem('token', response.data.access_token);
    //         alert('Logged in successfully');
    //         window.location.reload();
    //     } catch (error) {
    //         console.error('Login error:', error);
    //     }
    // };
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
            const token = response.data.access_token;
            const loggedInUserId = response.data.user_id;

            if (!loggedInUserId) {
                throw new Error('User ID is missing in response');
            }

            localStorage.setItem('token', token);
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
                return;
            }

            const response = await axios.get('http://127.0.0.1:5000/admin', {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert(response.data.message);
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'An error occurred';
            alert(`Admin access error: ${errorMessage}`);
            console.error('Admin access error:', errorMessage);
        }
    };



    return (
        <div>
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
            ) : (
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}

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
    );
};

export default UserProfile;
