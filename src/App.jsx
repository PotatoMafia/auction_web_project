// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './component/Register.jsx';
import Home from './component/Home.jsx';
import Login from './component/Login.jsx';
import UserProfile from './component/UserProfile.jsx';
import AdminDashboard from './component/AdminDashboard.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user/:userId" element={<UserProfile />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
