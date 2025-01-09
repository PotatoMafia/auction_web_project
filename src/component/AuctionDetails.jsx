// AuctionDetails.js
import  { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import Bid from './Bid';

// eslint-disable-next-line react/prop-types
const AuctionDetails = () => {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const [bids, setBids] = useState([]);


    

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/auction/${auctionId}`);
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
            await axios.post('http://127.0.0.1:5000/bid', {auction_id: auctionId, bid_price: bidAmount, token: localStorage.getItem('token') });
            alert('Bid placed successfully!');
            setBidAmount(''); // Clear the input field
        } catch (error) {
            console.error('Error placing bid:', error);
            alert('Failed to place bid.');
        }
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
