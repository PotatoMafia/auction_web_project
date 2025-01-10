import { useState, useEffect } from 'react';
import { createAuction, editAuction } from '../api/admin';

// eslint-disable-next-line react/prop-types
const AdminAuctionForm = ({ token, selectedAuction, onAuctionUpdated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        starting_price: '',
        start_time: '',
        end_time: '',
        user_id: '',
        status: '',
        image: null,
    });

    useEffect(() => {
        if (selectedAuction) {
            setFormData({
                // eslint-disable-next-line react/prop-types
                title: selectedAuction.title,// eslint-disable-next-line react/prop-types
                description: selectedAuction.description,// eslint-disable-next-line react/prop-types
                starting_price: selectedAuction.starting_price,// eslint-disable-next-line react/prop-types
                start_time: selectedAuction.start_time,// eslint-disable-next-line react/prop-types
                end_time: selectedAuction.end_time,// eslint-disable-next-line react/prop-types
                user_id: selectedAuction.user_id || '',// eslint-disable-next-line react/prop-types
                status: selectedAuction.status || '',
                image: null,
            });
        }
    }, [selectedAuction]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageBase64 = reader.result.split(',')[1];  // Извлекаем чистую строку base64
                setFormData((prevState) => ({
                    ...prevState,
                    image: imageBase64,
                }));

                // Логируем base64 строку изображения
                console.log("Image Base64:", imageBase64);

                // Выводим иконку изображения
                const image = new Image();
                image.src = `data:image/jpeg;base64,${imageBase64}`;
                image.onload = () => {
                    console.log("Image loaded successfully.");
                };
                image.onerror = (err) => {
                    console.error("Error loading image:", err);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title: formData.title,
            description: formData.description,
            starting_price: formData.starting_price,
            start_time: formData.start_time,
            end_time: formData.end_time,
            user_id: formData.user_id,
            status: formData.status,
            image: formData.image,
        };

        try {
            if (selectedAuction) {
                // eslint-disable-next-line react/prop-types
                await editAuction(selectedAuction.auction_id, data, token);
            } else {
                await createAuction(data, token);
                alert('Aukcja utworzona pomyślnie');
            }

            setFormData({
                title: '',
                description: '',
                starting_price: '',
                start_time: '',
                end_time: '',
                user_id: '',
                status: '',
                image: null, // Очистка изображения после отправки
            });

            if (onAuctionUpdated) {
                onAuctionUpdated(); // Уведомление о том, что аукцион был обновлен
            }
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
        <div className="form-container">
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
                <input
                    type="text"
                    name="user_id"
                    placeholder="User ID"
                    value={formData.user_id}
                    onChange={handleChange}
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                />
                <div className="image-preview">
                    {formData.image && (
                        <>
                            <img
                                src={`data:image/jpeg;base64,${formData.image}`}
                                alt="Preview"
                                style={{ width: 50, height: 50 }}
                            />
                            <p>Image preview</p>
                        </>
                    )}
                </div>
                <button type="submit">
                    {selectedAuction ? 'Zapisz' : 'Utwórz'}
                </button>
            </form>
        </div>
    );
};

export default AdminAuctionForm;
