import React, { useState } from "react"; // Importing React and useState hook
import DatePicker from "react-datepicker"; // Importing DatePicker component for date selection
import "react-datepicker/dist/react-datepicker.css"; // Importing the date picker styles
import { createAuction } from "../api/user"; // Importing the createAuction API function
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook for navigation

export default function CreateAuction() {
    // State hooks to handle form data and token
    const [title, setTitle] = useState(""); // Auction title state
    const [description, setDescription] = useState(""); // Auction description state
    const [startPrice, setStartPrice] = useState(0); // Auction starting price state
    const [startDate, setStartDate] = useState(new Date()); // Auction start date state
    const [endDate, setEndDate] = useState(new Date()); // Auction end date state
    const [image, setImage] = useState(null); // Image state to store the uploaded image
    const [token] = useState(localStorage.getItem('token')); // Get the stored token from localStorage
    const [user_id] = useState(localStorage.getItem('userId')); // Get the stored user ID from localStorage
    const navigate = useNavigate(); // navigate hook for redirecting to other pages

    // Function to format the date to the desired string format
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Return formatted date
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Prepare auction data to be sent
        const auctionData = {
            token,
            user_id,
            title,
            description,
            startPrice,
        };

        console.log("Auction created:", auctionData); // Log auction data to the console

        // If image is uploaded, log it
        if (image) {
            console.log("Image uploaded:", image);
        }

        // Call the API function to create the auction
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

        alert("Aukcja stworzona pomyslnie!"); // Alert the user
        navigate('/dashboard'); // Redirect the user to the dashboard
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the uploaded image in the state
    };

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <h2>Create Auction</h2>
            <form onSubmit={handleSubmit}> {/* Form for creating an auction */}
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="title">Tytul:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Update title state
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="description">Opis:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Update description state
                        required
                        style={{ width: "100%", padding: "8px" }}
                    ></textarea>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="startPrice">Cena startowa:</label>
                    <input
                        type="number"
                        id="startPrice"
                        value={startPrice}
                        onChange={(e) => setStartPrice(parseFloat(e.target.value))} // Update start price state
                        required
                        style={{ width: "100%", padding: "8px" }}
                        step="0.01" // Allow decimal values for price
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="startDate">Start Aukcji:</label>
                    <DatePicker
                        id="startDate"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)} // Update start date state
                        showTimeSelect
                        dateFormat="Pp" // Date format with time
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="endDate">Koniec Aukcji:</label>
                    <DatePicker
                        id="endDate"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)} // Update end date state
                        showTimeSelect
                        dateFormat="Pp" // Date format with time
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="image">Dodaj obraz:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange} // Handle image file change
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
