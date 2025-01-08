import { useState, useEffect } from 'react';
import { createAuction, editAuction } from '../api/admin';

// eslint-disable-next-line react/prop-types
const AdminAuctionForm = ({ token, selectedAuction }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        starting_price: '',
        start_time: '',
        end_time: ''
    });

    useEffect(() => {
        if (selectedAuction) {
            setFormData({// eslint-disable-next-line react/prop-types
                title: selectedAuction.title,// eslint-disable-next-line react/prop-types
                description: selectedAuction.description,// eslint-disable-next-line react/prop-types
                starting_price: selectedAuction.starting_price,// eslint-disable-next-line react/prop-types
                start_time: selectedAuction.start_time,// eslint-disable-next-line react/prop-types
                end_time: selectedAuction.end_time
            });
        }
    }, [selectedAuction]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedAuction) {
                // eslint-disable-next-line react/prop-types
                await editAuction(selectedAuction.auction_id, formData, token);
                alert('Aukcja zaktualizowana pomyślnie');
            } else {
                await createAuction(formData, token);
                alert('Aukcja utworzona pomyślnie');
            }
            setFormData({
                title: '',
                description: '',
                starting_price: '',
                start_time: '',
                end_time: ''
            });
        } catch (error) {
            console.error('Błąd:', error);
            alert('Operacja nie powiodła się');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <h2>{selectedAuction ? 'Edytuj Aukcję' : 'Nowa Aukcja'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Tytuł"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Opis"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="starting_price"
                    placeholder="Cena początkowa"
                    value={formData.starting_price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="datetime-local"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                />
                <input
                    type="datetime-local"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{selectedAuction ? 'Zapisz' : 'Utwórz'}</button>
            </form>
        </div>
    );
};

export default AdminAuctionForm;