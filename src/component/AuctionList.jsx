import { useEffect, useState } from 'react';
import { getAuctions } from '../api/user';
import Auction from './Auction';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AuctionList = ({ token, onSelectAuction =f =>f }) => {
    const [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();
    //isUser = true;

    

    useEffect(() => {
        if (true) {
            const fetchAuctions = async () => {
                try {
                    const data = await getAuctions(token);
                    setAuctions(data);
                } catch (error) {
                    console.error('Błąd pobierania aukcji:', error);
                    alert('Wystąpił błąd podczas pobierania aukcji.');
                }
            };

            fetchAuctions();
        }
    }, [token]);


    return (
        <div>
            <h2>Lista Aukcji</h2>
            <button onClick={() => {navigate("/auction/createauction")}}>
            Utwórz aukcje
            </button>
            <ul>
                {auctions.map(auction => <Auction key={auction.auction_id} {...auction} onCheck={onSelectAuction} />)}
            </ul>
        </div>
    );
};

export default AuctionList;
