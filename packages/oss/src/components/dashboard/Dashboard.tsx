import * as React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="admin-header">
            <div className="logo">
                <Link to="/">
                    <img src="../../assets/images/dytopian.png" alt="Logo" />
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </nav>
            <div className="user-profile">
                <span>Welcome, User123</span>
                <img src="/path/to/user-avatar.png" alt="User Avatar" />
            </div>
        </div>
    );
};

export default Dashboard;
