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
import CreateAuction from './component/CreateAuction.jsx';

const App = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const handleLogin = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };
    

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout onLogout={handleLogout} onLogin={handleLogin}> 
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Layout onLogout={handleLogout} onLogin={handleLogin}>
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
                        <Layout onLogout={handleLogout} onLogin={handleLogin}>
                            <UserProfile />
                        </Layout>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <Layout onLogout={handleLogout} onLogin={handleLogin}>
                            <AdminDashboard />
                        </Layout>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <Layout onLogout={handleLogout} onLogin={handleLogin}>
                            <UserDashboard />
                        </Layout>
                    }
                />
                <Route
                    path="/auction/:auctionId"
                    element={
                        <Layout onLogout={handleLogout} onLogin={handleLogin}>
                            <AuctionDetails />
                        </Layout>
                    }
                />
                <Route
                    path="/auction/createauction"
                    element={
                        <Layout onLogout={handleLogout} onLogin={handleLogin}>
                            <CreateAuction />
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
