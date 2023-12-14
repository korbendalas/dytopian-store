import * as React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Logo from "../../assets/images/featured-controller.png";

const Sidebar = () => {
    const location = useLocation();
    const { pathname } = location;
    console.log(pathname)

    return (
        <aside className="absolute left-0 top-0 z-9999 flex h-screen w-72 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full">
            <div className="flex px-6 py-5 lg:py-6">
                <Link className="flex items-center justify-between gap-2 " to="/">
                    <img src={Logo} alt="Logo" width={50}/>
                    <h1 className="text-xl">Dytopian store</h1>
                </Link>
            </div>
            <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">

                <ul className="mb-6 flex flex-col gap-1.5">
                    {/* zamenicu ovo za jednu komponentu kasnije item */}
                    <li className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        pathname.includes('dashboard') && 'bg-slate-500'
                    }`}>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;