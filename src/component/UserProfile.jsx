// src/component/UserProfile.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    console.log('User ID:', userId);
    const [userData, setUserData] = useState(null);
    const [bids, setBids] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted

        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`http://127.0.0.1:5000/user/${userId}`);
                if (isMounted) {
                    setUserData(userResponse.data);
                }

                const bidsResponse = await axios.get(`http://127.0.0.1:5000/user/${userId}/bids`);
                if (isMounted) {
                    setBids(bidsResponse.data);
                }

                const transactionsResponse = await axios.get(`http://127.0.0.1:5000/user/${userId}/transactions`);
                if (isMounted) {
                    setTransactions(transactionsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

        return () => {
            isMounted = false; // Cleanup function to set isMounted to false
        };
    }, [userId]);


    return (
        <div>
            <h2>Mój Profil</h2>
            {userData && (
                <div>
                    <h3>Dane użytkownika</h3>
                    <p>Email: {userData.email}</p>
                    <p>Użytkownik: {userData.username}</p>
                </div>
            )}

            <h3>Historia Licytacji</h3>
            <ul>
                {bids.map(bid => (
                    <li key={bid.bid_id}>
                        <p>Aukcja ID: {bid.auction_id}, Oferta: ${bid.bid_price}, Czas: {new Date(bid.bid_time).toLocaleString()}</p>
                    </li>
                ))}
            </ul>

            <h3>Historia Transakcji</h3>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.transaction_id}>
                        <p>Aukcja ID: {transaction.auction_id}, Status płatności: {transaction.payment_status}, Czas: {new Date(transaction.transaction_time).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
