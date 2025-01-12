import { useEffect, useState } from 'react';
import { getAuctions } from '../api/user';
import Auction from './Auction';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AuctionList = ({ token, onSelectAuction = f => f }) => {
    const [auctions, setAuctions] = useState([]);  // State to store the list of auctions
    const navigate = useNavigate();  // Navigate to different pages

    // Fetch auctions when the component mounts or token changes
    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const data = await getAuctions(token);  // Fetch auctions using the provided token
                setAuctions(data);  // Update state with fetched auctions
            } catch (error) {
                console.error('Błąd pobierania aukcji', error);
                alert('Wystąpił błąd podczas pobierania aukcji.');
            }
        };
        fetchAuctions();  // Call the fetch function
    }, [token]);  // Depend on the token to re-fetch auctions if it changes

    return (
        <div>
            <h2>Auction List</h2>
            <button onClick={() => { navigate("/auction/createauction") }}>
                Create Auction  {/* Button to navigate to the Create Auction page */}
            </button>
            <ul>
                {/* Map over the auctions array and render an Auction component for each auction */}
                {auctions.map(auction => (
                    <Auction key={auction.auction_id} {...auction} onCheck={onSelectAuction} />
                ))}
            </ul>
        </div>
    );
};

export default AuctionList;
