import axios from 'axios';

//Pisze tu bo duzo danych w APP.jsx
import { API_URL } from '../config.js';

// WSZ akc
export const getAuctions = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/admin/auctions`, {
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
    const response = await axios.get(`${API_URL}/auctions`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};


// Nowa
export const createAuction = async (auctionData, token) => {
    const response = await axios.post(`${API_URL}/admin/auction`, auctionData, {
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
