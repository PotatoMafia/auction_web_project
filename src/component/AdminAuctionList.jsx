// eslint-disable-next-line react/prop-types
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
