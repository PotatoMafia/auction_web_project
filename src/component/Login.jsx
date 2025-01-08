// src/component/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('token', data.access_token);
                navigate(`/user/${data.user_id}`);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login. Please try again later.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <button type="submit" style={{ padding: '0.5rem', width: '100%' }}>
                    Login
                </button>
                <div style={{ marginTop: '1rem' }}>
                    <p>Dont have an account? <button onClick={() => navigate('/register')}>Register</button></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
