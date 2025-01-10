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
                title: selectedAuction.title,
                // eslint-disable-next-line react/prop-types
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

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                <input type="file" name="image" ref={fileInputRef} onChange={handleImageChange} />
                <div className="image-preview">
                    {formData.image && (
                        <img src={URL.createObjectURL(formData.image)} alt="Preview" style={{ width: 50, height: 50 }} />
                    )}
                </div>
                <button type="submit">{selectedAuction ? 'Save' : 'Create'}</button>
            </form>
        </div>
    );
};

export default AdminAuctionForm;
