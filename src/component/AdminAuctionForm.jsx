import { useState, useEffect, useRef } from 'react';
import { createAuction, editAuction } from '../api/admin';

// AdminAuctionForm component is used for both creating a new auction and editing an existing one.
// It takes 'token' for authentication, 'selectedAuction' for pre-filling the form if editing, and 'onAuctionUpdated' for notifying the parent component of changes.
// eslint-disable-next-line react/prop-types
const AdminAuctionForm = ({ token, selectedAuction, onAuctionUpdated }) => {
    // State to manage form data
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

    const fileInputRef = useRef(null);  // Reference to the file input element

    // Effect hook to populate the form with existing auction data if 'selectedAuction' is provided
    useEffect(() => {
        if (selectedAuction) {
            setFormData({
                // eslint-disable-next-line react/prop-types
                title: selectedAuction.title,
                // eslint-disable-next-line react/prop-types
                description: selectedAuction.description,
                // eslint-disable-next-line react/prop-types
                starting_price: selectedAuction.starting_price,
                // eslint-disable-next-line react/prop-types
                start_time: selectedAuction.start_time,
                // eslint-disable-next-line react/prop-types
                end_time: selectedAuction.end_time,
                // eslint-disable-next-line react/prop-types
                user_id: selectedAuction.user_id || '',
                // eslint-disable-next-line react/prop-types
                status: selectedAuction.status || '',
                image: null,  // Reset the image when editing
            });
        }
    }, [selectedAuction]); // Run this effect whenever 'selectedAuction' changes

    // Handle image selection from the file input
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevState) => ({
                ...prevState,
                image: file,  // Set the selected image to formData state
            }));
        }
    };

    // Handle image cancellation (remove selected image)
    const handleImageCancel = () => {
        setFormData((prevState) => ({
            ...prevState,
            image: null,
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle form submission (create or edit auction)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure the end time is later than the start time
        if (new Date(formData.end_time) <= new Date(formData.start_time)) {
            alert('End time cannot be earlier than start time');
            return;
        }

        if (!formData.image) {
            alert('Image is required');
            return;
        }

        // Prepare the form data for submission
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('starting_price', formData.starting_price);
        formDataToSend.append('start_time', formData.start_time);
        formDataToSend.append('end_time', formData.end_time);
        formDataToSend.append('user_id', formData.user_id);
        formDataToSend.append('status', formData.status);

        if (formData.image) {
            formDataToSend.append('image', formData.image);  // Append the image to form data
        }

        try {
            if (selectedAuction) {
                // If editing an existing auction, call the editAuction function
                // eslint-disable-next-line react/prop-types
                await editAuction(selectedAuction.auction_id, formDataToSend, token);
            } else {
                // If creating a new auction, call the createAuction function
                await createAuction(formDataToSend, token);
                alert('Auction created successfully!');
            }

            // Reset the form data after submission
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

            // Clear the file input reference
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            // Notify the parent component if a callback function is provided
            if (onAuctionUpdated) {
                onAuctionUpdated();
            }
        } catch (error) {
            console.error('Error during submission:', error);
            alert('Operation failed');
        }
    };

    // Handle changes in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handle cancel action to reset the form
    const handleCancel = () => {
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
                        <>
                            <button type="button" onClick={handleImageCancel} className="white-button">Cancel</button>
                            <div className="image-preview">
                                <img src={URL.createObjectURL(formData.image)} alt="Preview" />
                            </div>
                        </>
                    )}
                </div>

                {/* Submit and Cancel buttons */}
                <button type="submit">{selectedAuction ? 'Save' : 'Create'}</button>
                <button type="button" onClick={handleCancel} className="button1">Cancel Edit</button>
            </form>
        </div>
    );
};

export default AdminAuctionForm;
