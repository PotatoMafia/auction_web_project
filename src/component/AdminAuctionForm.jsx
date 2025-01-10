import { useState, useEffect, useRef } from 'react';
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

    const fileInputRef = useRef(null);

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
            setFormData((prevState) => ({
                ...prevState,
                image: file,
            }));
        }
    };

    const handleImageCancel = () => {
        setFormData((prevState) => ({
            ...prevState,
            image: null,
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Очищаем выбранный файл
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка, что конечная дата не раньше начальной
        if (new Date(formData.end_time) <= new Date(formData.start_time)) {
            alert('End time cannot be earlier than start time');
            return;
        }

        // Проверка, что изображение выбрано
        if (!formData.image) {
            alert('Image is required');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('starting_price', formData.starting_price);
        formDataToSend.append('start_time', formData.start_time);
        formDataToSend.append('end_time', formData.end_time);
        formDataToSend.append('user_id', formData.user_id);
        formDataToSend.append('status', formData.status);

        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            if (selectedAuction) {
                // eslint-disable-next-line react/prop-types
                await editAuction(selectedAuction.auction_id, formDataToSend, token);
            } else {
                await createAuction(formDataToSend, token);
                alert('Auction created successfully!');
            }

            setFormData({
                title: '',
                description: '',
                starting_price: '',
                start_time: '',
                end_time: '',
                user_id: '',
                status: '',
                image: null,
            });

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            if (onAuctionUpdated) {
                onAuctionUpdated();
            }
        } catch (error) {
            console.error('Error during submission:', error);
            alert('Operation failed');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCancel = () => {
        // Сбросить форму и вернуть к первоначальному состоянию
        setFormData({
            title: '',
            description: '',
            starting_price: '',
            start_time: '',
            end_time: '',
            user_id: '',
            status: '',
            image: null,
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Очистить поле выбора файла
        }

        if (onAuctionUpdated) {
            onAuctionUpdated(); // Вызываем обновление (если необходимо)
        }
    };

    return (
        <div className="form-container">
            <h2>{selectedAuction ? 'Edit Auction' : 'New Auction'}</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="number" name="starting_price" placeholder="Starting Price" value={formData.starting_price} onChange={handleChange} required />
                <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} required />
                <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} required />
                <input type="text" name="user_id" placeholder="User ID" value={formData.user_id} onChange={handleChange} />

                <div className="image-upload-container">
                    <input type="file" name="image" ref={fileInputRef} onChange={handleImageChange} />
                    {formData.image && (
                        <button type="button" onClick={handleImageCancel} className="cancel-button">Cancel</button>
                    )}
                </div>

                <div className="image-preview">
                    {formData.image && (
                        <img src={URL.createObjectURL(formData.image)} alt="Preview" style={{ width: 50, height: 50 }} />
                    )}
                </div>

                <button type="submit">{selectedAuction ? 'Save' : 'Create'}</button>
                <button type="button" onClick={handleCancel} className="button1">Cancel Edit</button>
            </form>
        </div>
    );
};

export default AdminAuctionForm;
