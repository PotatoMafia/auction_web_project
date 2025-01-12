// AuctionDetails.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Bid from './Bid';
import { API_URL } from '../config.js';

// Function to check if the token is still valid based on its expiration time
const isTokenValid = (token) => {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));  // Decode the JWT token
        return decoded.exp * 1000 > Date.now(); // Compare expiration time with current time
    } catch {
        return false;
    }
};

// AuctionDetails component
const AuctionDetails = () => {
    const { auctionId } = useParams();  // Get auction ID from URL parameters
    const [auction, setAuction] = useState(null);  // State to hold auction details
    const [bidAmount, setBidAmount] = useState('');  // State to hold the bid amount input
    const [bids, setBids] = useState([]);  // State to hold bids for the auction
    const [token] = useState(localStorage.getItem('token'));  // Get token from localStorage
    const navigate = useNavigate();  // Navigation function for redirecting

    // Check if the user is logged in and the token is valid
    useEffect(() => {
        if (!token || !isTokenValid(token)) {
            alert('Brak uprawnień lub token wygasł. Zaloguj się ponownie.');
            navigate('/login');
        }
    }, [token, navigate]);

    // Fetch auction details when the component mounts or when auctionId changes
    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/auction/${auctionId}`);
                setAuction(response.data);  // Store auction data
                setBids(response.data.bids);  // Store bids for this auction
            } catch (error) {
                console.error('Error fetching auction details:', error);
            }
        };

        fetchAuctionDetails();
    }, [auctionId]);

    // Handle bid submission
    const handleBidSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/bid`, {
                headers: { Authorization: `Bearer ${token}` },  // Add token for authorization
                auction_id: auctionId,
                bid_price: bidAmount,
                user_id: localStorage.getItem('userId'),
            });
            alert('Bid placed successfully!');
            setBidAmount('');  // Clear the bid input field
        } catch (error) {
            console.error('Error placing bid:', error);
            alert('Failed to place bid.');
        }
        window.location.href = `/auction/${auctionId}`;  // Refresh the page to show updated bid list
    };

    // If auction details are not loaded yet, display a loading message
    if (!auction) {
        return <div>Loading auction details...</div>;
    }

    return (
        <div>
            <h2>{auction.title}</h2>
            <p>{auction.description}</p>
            <p>Cena startowa: ${auction.starting_price}</p>
            <p>Start auckji: {new Date(auction.start_time).toLocaleString()}</p>
            <p>Koniec aukcji: {new Date(auction.end_time).toLocaleString()}</p>
            <h2>Ostatnie oferty</h2>
            <ul>
                {/* Render all bids for this auction */}
                {bids.map(bid => <Bid key={bid.bid_price} {...bid} />)}
            </ul>

            {/* Form to submit a bid */}
            <form onSubmit={handleBidSubmit}>
                <input
                    type="number"
                    placeholder="Enter your bid"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}  // Update bid amount as user types
                    required
                />
                <button type="submit">Place Bid</button>
            </form>
        </div>
    );
};

export default AuctionDetails;
