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


export const createAuction = async (token,start_time,end_time,start_price,user_id,title,description,image) => {
    try {
        // Tworzymy obiekt FormData do przesyłania danych
        const formData = new FormData();
        formData.append("starting_price", start_price);
        formData.append("start_time", start_time);
        formData.append("end_time", end_time);
        formData.append("user_id", user_id);
        formData.append("title", title);
        formData.append("description", description);

        // Jeśli obrazek istnieje, dodaj go do FormData
        if (image) {
            console.log("jest obrazek");
            formData.append("image", image); // Obrazek dodawany jako pole 'image'
        }

        // Wysyłanie danych za pomocą axios
        const response = await axios.post(`${API_URL}/auctions`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // Ustawienie Content-Type dla przesyłania plików
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Błąd podczas tworzenia aukcji:", error);
        throw error;
    }
};


