import axios from 'axios';
const API_URL = 'http://127.0.0.1:5000';


export const getAuctions = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/auctions`, {
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

export const placeBid = async (bidData, token) => {
    const response = await axios.post(`${API_URL}/bid`, bidData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};


export const createAuction = async (token,start_time,end_time,start_price,user_id,title,description) => {
    try {
        const response = await axios.post(`${API_URL}/auctions`, {starting_price:start_price,start_time:start_time,user_id,user_id,end_time:end_time,title:title,description:description,
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


