import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    console.log('User ID:', userId);
    const [userData, setUserData] = useState(null);
    const [bids, setBids] = useState([]);
    const [transactions, setTransactions] = useState([]);

    // Stany do przechowywania email i password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        let isMounted = true; // Śledzenie, czy komponent jest zamontowany

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
                console.error('Błąd podczas pobierania danych użytkownika:', error);
            }
        };

        fetchUserData();

        return () => {
            isMounted = false; // Funkcja czyszcząca ustawiająca isMounted na false
        };
    }, [userId]);

    const handleAdminNavigate = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
            localStorage.setItem('adminToken', response.data.access_token); // Zapisanie tokena
            navigate('/admin');
        } catch (error) {
            console.error('Błąd logowania:', error);
        }
    };

    return (
        <div>
            <h2>Mój Profil</h2>
            {userData && (
                <div>
                    <h3>Dane użytkownika</h3>
                    <p>Email: {userData.email}</p>
                    <p>Użytkownik: {userData.username}</p>
                    {userData.status === 'admin' && (
                        <div>
                            {/* Pola do wprowadzenia email i hasła */}
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Hasło"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button onClick={handleAdminNavigate}>Przejdź do panelu administracyjnego</button>
                        </div>
                    )}
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
