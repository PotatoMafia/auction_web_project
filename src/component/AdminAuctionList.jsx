// eslint-disable-next-line react/prop-types
import { API_URL } from '../config.js';
const AdminAuctionList = ({ auctions, onSelectAuction }) => {
    return (
        <div>
            <h2>Lista Aukcji</h2>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>Tytuł</th>
                    <th>Opis</th>
                    <th>Cena Początkowa</th>
                    <th>Data Rozpoczęcia</th>
                    <th>Data Zakończenia</th>
                    <th>User ID</th>
                    <th>Status</th>
                    <th>Obrazek</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {/* eslint-disable-next-line react/prop-types */}
                {auctions.map((auction) => (
                    <tr key={auction.auction_id}>
                        <td>{auction.title}</td>
                        <td>{auction.description}</td>
                        <td>{auction.starting_price}</td>
                        <td>{new Date(auction.start_time).toLocaleString()}</td>
                        <td>{new Date(auction.end_time).toLocaleString()}</td>
                        <td>{auction.user_id || 'N/A'}</td>
                        <td>{auction.status}</td>
                        <td>
                            {auction.image_url ? (
                                <img
                                    src={`${API_URL}/imagesForAuctions/${auction.image_url}`}
                                    // alt={auction.title}
                                    style={{ width: '100px', height: '100px' }}
                                />
                            ) : (
                                <span>No image</span>
                            )}
                        </td>
                        <td>
                            <button onClick={() => onSelectAuction(auction)}>Edytuj</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminAuctionList;
