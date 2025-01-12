// src/components/Register.jsx
import { useState } from 'react'; // Import React hook for managing state
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { registerUser } from '../api'; // Import the API function for user registration

const Register = () => {
    const [email, setEmail] = useState(''); // State to track the email input
    const [username, setUsername] = useState(''); // State to track the username input
    const [password, setPassword] = useState(''); // State to track the password input
    const [error, setError] = useState(''); // State to track any error messages
    const navigate = useNavigate(); // Initialize the navigate function for routing

    // Function to handle form submission for user registration
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Call the registerUser API function to register the user
            await registerUser({ email, username, password });
            alert('Pomyslnie Zarejestrowano'); // Show success message
            navigate('/login'); // Redirect to the login page after successful registration
        } catch (error) {
            // If registration fails, show an error message
            setError('Nieudalo sie zarejestrowac. Sprobuj ponownie.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Register</h2>
            {/* Display error message if there is one */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}> {/* Form for registration */}
                <input
                    type="email" // Input for email
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                    placeholder="Email"
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />
                <input
                    type="text" // Input for username
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                    placeholder="Username"
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />
                <input
                    type="password" // Input for password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                    placeholder="Password"
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />
                <button type="submit" style={{ width: '100%' }}> {/* Submit button for registration */}
                    Register
                </button>
                <div style={{ marginTop: '1rem' }}>
                    {/* Link to login page if the user already has an account */}
                    <p>Masz już konto? <button onClick={() => navigate('/login')}>Login</button></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
