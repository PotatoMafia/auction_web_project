// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './component/Register.jsx';
import Home from './component/Home.jsx';
import Login from './component/Login.jsx';
import UserProfile from './component/UserProfile.jsx';
import AdminDashboard from './component/AdminDashboard.jsx';
import UserDashboard from './component/UserDashboard.jsx';
import Layout from './api/layout.jsx';
import './styles/style.css';
import AuctionDetails from './component/AuctionDetails.jsx';

const App = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout onLogout={handleLogout}>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Layout onLogout={handleLogout}>
                            <Register />
                        </Layout>
                    }
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/user/:userId"
                    element={
                        <Layout onLogout={handleLogout}>
                            <UserProfile />
                        </Layout>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <Layout onLogout={handleLogout}>
                            <AdminDashboard />
                        </Layout>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <Layout onLogout={handleLogout}>
                            <UserDashboard />
                        </Layout>
                    }
                />
                <Route
                    path="/auction/:auctionId"
                    element={
                        <Layout onLogout={handleLogout}>
                            <AuctionDetails />
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
