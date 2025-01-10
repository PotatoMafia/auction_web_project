// src/components/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ email, username, password });
            alert('Registration successful');
            navigate('/login');
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />
                <button type="submit" style={{ width: '100%' }}>
                    Register
                </button>
                <div style={{ marginTop: '1rem' }}>
                    <p>Already have an account? <button onClick={() => navigate('/login')}>Login</button></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
