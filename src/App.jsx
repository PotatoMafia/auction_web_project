// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './component/Register';
import Home from './component/Home';
import Login from './component/Login';
import UserProfile from './component/UserProfile';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user/:userId" element={<UserProfile />} />
            </Routes>
        </Router>
    );
};

export default App;
