import axios from 'axios';

//Pisze tu bo duzo danych w APP.jsx
const API_URL = 'http://127.0.0.1:5000';

// WSZ akc
export const getAuctions = async (token) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/admin/auctions`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Błąd podczas pobierania aukcji:', error);
        throw error;
    }
};

export const fetchAuctions = async (token) => {
    const response = await axios.get('http://127.0.0.1:5000/auctions', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};


// Nowa
export const createAuction = async (auctionData, token) => {
    const response = await axios.post(`http://127.0.0.1:5000/admin/auction`, auctionData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

// Zmienic akc
export const editAuction = async (auctionId, auctionData, token) => {
    const response = await axios.put(`${API_URL}/admin/auction/${auctionId}`, auctionData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
