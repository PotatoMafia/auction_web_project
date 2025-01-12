// eslint-disable-next-line react/prop-types
import { API_URL } from '../config.js'; // Importing API URL from configuration

// eslint-disable-next-line react/prop-types
const AdminAuctionList = ({ auctions, onSelectAuction }) => {
    return (
        <div>
            <h2>Auction List</h2> {/* Displaying the title of the auction list */}
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>Title</th> {/* Column for auction title */}
                    <th>Description</th> {/* Column for auction description */}
                    <th>Starting Price</th> {/* Column for starting price */}
                    <th>Start Date</th> {/* Column for the date of the begining */}
                    <th>End Date</th> {/* Column for ending date */}
                    <th>User ID</th> {/* Column for user ID */}
                    <th>Status</th> {/* Column for auction status */}
                    <th>Image</th> {/* Column for auction image */}
                    <th>Actions</th> {/* Column for actions (e.g., edit) */}
                </tr>
                </thead>
                <tbody>
                {/* eslint-disable-next-line react/prop-types */}
                {auctions.map((auction) => (  // Loop through auctions to render each one
                    <tr key={auction.auction_id}>
                        <td>{auction.title}</td> {/* Auction title */}
                        <td>{auction.description}</td> {/* Auction description */}
                        <td>{auction.starting_price}</td> {/* Starting price */}
                        <td>{new Date(auction.start_time).toLocaleString()}</td> {/* Formatted start date */}
                        <td>{new Date(auction.end_time).toLocaleString()}</td> {/* Formatted end date */}
                        <td>{auction.user_id || 'N/A'}</td> {/* User ID or 'N/A' if not available */}
                        <td>{auction.status}</td> {/* Auction status */}
                        <td>
                            {auction.image_url ? (
                                <img
                                    src={`${API_URL}/imagesForAuctions/${auction.image_url}`} // Display image if available
                                    style={{ width: '100px', height: '100px' }} // Image size
                                />
                            ) : (
                                <span>No image</span> // Display 'No image' if no image URL is present
                            )}
                        </td>
                        <td>
                            <button onClick={() => onSelectAuction(auction)}>Edit</button> {/* Edit button */}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminAuctionList;
