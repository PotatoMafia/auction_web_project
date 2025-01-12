import { useState } from 'react'; // Importing React hook to manage local state
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for routing navigation
import '../styles/style.css'; // Importing styles for the component
import { API_URL } from '../config.js'; // Importing the API base URL from config

const Login = () => {
    const [email, setEmail] = useState(''); // State to track the email input value
    const [password, setPassword] = useState(''); // State to track the password input value
    const [error, setError] = useState(''); // State to store error messages, if any
    const navigate = useNavigate(); // useNavigate hook to navigate to different routes after login

    // Function to handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Make a POST request to the login API endpoint
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Setting content type to JSON for the request body
                },
                body: JSON.stringify({ email, password }), // Sending email and password in request body
            });

            if (response.ok) { // If the response is successful
                const data = await response.json(); // Parse the response body into JSON
                // Storing the token, role, and user ID in localStorage
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('userId', data.user_id);

                // Navigate to the user's profile page if user ID exists
                if (data.user_id) {
                    navigate(`/user/${data.user_id}`);
                } else {
                    // Set error if the user ID is missing in the response
                    setError('User_ID nie odnalezione sprobuj pozniej.');
                }
            } else {
                // If the response is not successful, handle the error
                const errorData = await response.json();
                setError(errorData.message || 'Logowanie nieudane'); // Show the error message from the server
            }
        } catch (err) {
            // Catch any errors during the fetch request
            console.error('Login error:', err);
            setError('Error wystapil podczas logowania. Sprobuj pozniej.'); // Show a generic error message
        }
    };

    return (
        <div className="centered-container">
            <div className="login-form-container">
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display the error message, if any */}
                <form onSubmit={handleLogin}> {/* Form submission handler */}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email" // Input field for email
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update the email state on input change
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password" // Input field for password
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update the password state on input change
                            required
                        />
                    </div>
                    <button type="submit">Login</button> {/* Submit button for login */}
                    <p>Nie masz konta? 
                        <button type="button" onClick={() => navigate('/register')}>Register</button> {/* Link to the registration page */}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
