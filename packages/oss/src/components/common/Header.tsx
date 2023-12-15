import * as React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
           <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
            <nav className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </nav>
            <div className="user-profile">
                <span>Welcome, User123</span>
                <img src="/path/to/user-avatar.png" alt="User Avatar" />
            </div>
           </div>
        </div>
    );
};

export default Header;
