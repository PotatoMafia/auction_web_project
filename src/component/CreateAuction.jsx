import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createAuction } from "../api/user";
import { useNavigate } from 'react-router-dom';

export default function CreateAuction() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startPrice, setStartPrice] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [image, setImage] = useState(null); // Dodany stan dla obrazka
    const [token] = useState(localStorage.getItem('token'));
    const [user_id] = useState(localStorage.getItem('userId'));
    const navigate = useNavigate();

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const auctionData = {
            token,
            user_id,
            title,
            description,
            startPrice,
        };

        console.log("Auction created:", auctionData);

        if (image) {
            console.log("Image uploaded:", image);
        }

        createAuction(
            token,
            formatDate(startDate),
            formatDate(endDate),
            startPrice,
            user_id,
            title,
            description,
            image,
        );

        alert("Auction submitted successfully!");
        navigate('/dashboard');
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Przechowywanie pliku obrazu
    };

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <h2>Create Auction</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    ></textarea>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="startPrice">Starting Price:</label>
                    <input
                        type="number"
                        id="startPrice"
                        value={startPrice}
                        onChange={(e) => setStartPrice(parseFloat(e.target.value))}
                        required
                        style={{ width: "100%", padding: "8px" }}
                        step="0.01"
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Start Date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>End Date:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
                    Submit
                </button>
            </form>
        </div>
    );
}
