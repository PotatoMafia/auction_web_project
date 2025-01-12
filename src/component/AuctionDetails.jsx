// AuctionDetails.js
import  { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Bid from './Bid';
import { API_URL } from '../config.js';


const isTokenValid = (token) => {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.exp * 1000 > Date.now(); // Check expiration timestamp
    } catch {
        return false;
    }
};

// eslint-disable-next-line react/prop-types
const AuctionDetails = () => {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const [bids, setBids] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
                if (!token || !isTokenValid(token)) {
                    alert('Brak uprawnień lub token wygasł. Zaloguj się ponownie.');
                    navigate('/login');
                }
            }, [token, navigate]);



    

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/auction/${auctionId}`);
                setAuction(response.data);
                setBids(response.data.bids);
            } catch (error) {
                console.error('Error fetching auction details:', error);
            }
        };

        fetchAuctionDetails();
    }, [auctionId]);

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/bid`, {
                headers: {Authorization: `Bearer ${token}`},
            auction_id: auctionId, bid_price: bidAmount, user_id: localStorage.getItem('userId') });
            alert('Bid placed successfully!');
            setBidAmount(''); // Clear the input field
        } catch (error) {
            console.error('Error placing bid:', error);
            alert('Failed to place bid.');
        }
        window.location.href = `/auction/${auctionId}`;
    };

    if (!auction) {
        return <div>Loading auction details...</div>;
    }

    return (
        <div>
            <h2>{auction.title}</h2>
            <p>{auction.description}</p>
            <p>Starting Price: ${auction.starting_price}</p>
            <p>Ends at: {new Date(auction.start_time).toLocaleString()}</p>
            <p>Ends at: {new Date(auction.end_time).toLocaleString()}</p>
            <h2>Lista ofert</h2>
            <ul>
                {bids.map(bid => <Bid key={bid.bid_price} {...bid}  />)}
            </ul>
            
            

            <form onSubmit={handleBidSubmit}>
                <input
                    type="number"
                    placeholder="Enter your bid"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                />
                <button type="submit">Place Bid</button>
            </form>
        </div>
    );
};

export default AuctionDetails;
