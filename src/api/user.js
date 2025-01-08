import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const getAuctions = async (token) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/auctions`, {
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