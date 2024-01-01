import * as React from 'react';
import { Link } from 'react-router-dom';
import {useSidebarStore, useAuthStore } from '@/store';
import { toast } from "react-toastify";
import {Spinner} from '@/components/UI/atoms/Spinner';
import {post} from "@/api/config/requests";
import { useMutation } from "@tanstack/react-query";
import {LOGOUT_URL, SIGNIN_URL} from "@/api/config/constants";
import {LoginInput} from "@/components/pages/login.page";
import {getToken, removeToken} from "@/utilis/tokenUtilis";

export const Header = () => {
    const { sidebarOpen, toggleSidebar } = useSidebarStore();
    const auth = useAuthStore();
    const user = auth.authUser;
    let token = getToken();

    const { mutate: logoutUser } = useMutation( {
        mutationFn: (userData: LoginInput) => post(LOGOUT_URL, userData),
        onSuccess(data) {
            auth.setRequestLoading(false);
            removeToken(token);
            toast.success("Successfully logged out", {
                position: "top-right",
            });
            document.location.href = "/signin";
        },
        onError(error: any) {
            auth.setRequestLoading(false);
            auth.setAuthUser(null);
            document.location.href = "/signin";
        },
    });

    const handleLogout = () => {
        logoutUser();
    };
    
    return (
        <>
            <header className="bg-white h-20">
                <nav className="h-full flex justify-between container items-center">
                    <div>
                        <Link to="/" className="text-ct-dark-600 text-2xl font-semibold">
                            CodevoWeb
                        </Link>
                    </div>
                    <ul className="flex items-center gap-4">
                        <li>
                            <Link to="/" className="text-ct-dark-600">
                                Home
                            </Link>
                        </li>
                        {!user && (
                            <>
                                <li>
                                    <Link to="/signup" className="text-ct-dark-600">
                                        SignUp
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signin" className="text-ct-dark-600">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li>
                                    <Link to="/profile" className="text-ct-dark-600">
                                        Profile
                                    </Link>
                                </li>
                                <li className="cursor-pointer" onClick={handleLogout}>
                                    Logout
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
            <div className="pt-4 pl-2 bg-ct-blue-600 fixed">
                {auth.requestLoading && <Spinner color="text-ct-yellow-600" />}
            </div>
        </>
        // <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        //     <div className=" top-0 z-10 flex w-16 justify-center">
        //         <button type="button" className="-m-2.5 p-2.5 border-none focus:outline-none" onClick={toggleSidebar}>
        //             <i className={`fa-solid ${sidebarOpen ? 'fa-xmark' : 'fa-bars' } text-black text-2xl`} />
        //         </button>
        //     </div>
        //    <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        //     <nav className="nav-links">
        //         <Link to="/dashboard">Dashboard</Link>
        //         <Link to="/users">Users</Link>
        //     </nav>
        //     <div className="user-profile">
        //         <span>Welcome, User123</span>
        //         <img src="/path/to/user-avatar.png" alt="User Avatar" />
        //     </div>
        //    </div>
        // </header>
    );
};