import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAuctionList from './AdminAuctionList';
import AdminAuctionForm from './AdminAuctionForm';
import '../styles/style.css';
import { fetchAuctions } from '../api/admin';

// Function to check if the token is valid based on expiration
const isTokenValid = (token) => {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

const AdminDashboard = () => {
    const [token] = useState(localStorage.getItem('token')); // Get the token from localStorage
    const [selectedAuction, setSelectedAuction] = useState(null); // State to track the selected auction
    const [auctions, setAuctions] = useState([]); // State to store list of auctions
    const [, setLoading] = useState(true); // State to manage loading state
    const navigate = useNavigate(); // Hook to navigate between pages

    useEffect(() => {
        // Check if the token is missing, invalid, or user role is not admin
        if (!token || !isTokenValid(token) || localStorage.getItem('role') !== 'admin') {
            alert('No permissions or token expired. Please log in again.'); // Show error message
            navigate('/login'); // Redirect to login page + clear localStorage
            localStorage.clear();
        } else {
            loadAuctions(); // Load auctions if the token is valid
            setLoading(false);
        }
    }, [token, navigate]);

    // Function to fetch auctions from the API
    const loadAuctions = async () => {
        try {
            const data = await fetchAuctions(token); // Fetch auctions using the token
            setAuctions(data); // Update the auctions state with the fetched data
        } catch (error) {
            console.error('Error fetching auctions:', error); // Log any errors
        }
    };

    // Function to handle auction selection (for editing)
    const handleSelectAuction = (auction) => {
        setSelectedAuction(auction);
    };

    return (
        <div className="scrollable-container">
            <h1>Admin Dashboard</h1>
            {token ? ( // Check if the token is available if no => send to the login page
                <>
                    <AdminAuctionList
                        token={token}
                        auctions={auctions}
                        onSelectAuction={handleSelectAuction}
                    /> {/* Display the auction list */}
                    <AdminAuctionForm
                        token={token}
                        selectedAuction={selectedAuction}
                        onAuctionUpdated={loadAuctions}
                    /> {/* Display the auction form (edit / create new) */}
                </>
            ) : (
                <p>Loading the panel...</p>
            )}
        </div>
    );
};

export default AdminDashboard;
