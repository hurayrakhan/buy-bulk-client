import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../Providers/AuthProvider';
import ThemeToggle from './ThemeToggle';
import { MdLogout, MdSettings } from "react-icons/md";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { AiFillProduct } from "react-icons/ai";
import { IoBagAdd } from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";

import Swal from 'sweetalert2';
import { CartContext } from '../Providers/CartProvider';

const Navbar = () => {
    const { carts } = useContext(CartContext);
    const { user, signOutUser } = useContext(AuthContext);
    const { categoryName } = useParams();
    const category = categoryName || 'All';
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                navigate('/login');
                Swal.fire({
                    title: "LogOut Successful!",
                    text: `Logged out!, ${user.displayName || 'User'}!`,
                    icon: "success",
                    confirmButtonText: "Continue"
                });
                setSidebarOpen(false);
            })
            .catch(error => {
                Swal.fire({
                    title: "LogOut Failed",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Retry"
                });
            });
    };

    // Main nav links (used in both Navbar and Sidebar)
    const links = <>
        <NavLink to="/" className={({ isActive }) =>
            isActive
                ? "bg-[#FF3F33] text-white font-semibold py-2 px-3 rounded flex items-center gap-1"
                : "text-[#FF3F33] hover:bg-[#FFE5DC] font-semibold py-2 px-3 rounded flex items-center gap-1"
        }><FaHome size={20} />Home</NavLink>

        <NavLink to={`/category/${category}`} className={({ isActive }) =>
            isActive
                ? "bg-[#FF3F33] text-white font-semibold py-2 px-3 rounded flex items-center gap-1"
                : "text-[#FF3F33] hover:bg-[#FFE5DC] font-semibold py-2 px-3 rounded flex items-center gap-1"
        }><AiFillProduct size={20} />All Products</NavLink>

        {user && <>
            <NavLink to="/addProduct" className={({ isActive }) =>
                isActive
                    ? "bg-[#FF3F33] text-white font-semibold py-2 px-3 rounded flex items-center gap-1"
                    : "text-[#FF3F33] hover:bg-[#FFE5DC] font-semibold py-2 px-3 rounded flex items-center gap-1"
            }><IoBagAdd size={20} />Add Product</NavLink>

            <NavLink to="/myProducts" className={({ isActive }) =>
                isActive
                    ? "bg-[#FF3F33] text-white font-semibold py-2 px-3 rounded flex items-center gap-1"
                    : "text-[#FF3F33] hover:bg-[#FFE5DC] font-semibold py-2 px-3 rounded flex items-center gap-1"
            }><FaHandHoldingHeart size={20} />My Products</NavLink>
        </>}

        <NavLink to="/aboutUs" className={({ isActive }) =>
            isActive
                ? "bg-[#FF3F33] text-white font-semibold py-2 px-3 rounded flex items-center gap-1"
                : "text-[#FF3F33] hover:bg-[#FFE5DC] font-semibold py-2 px-3 rounded flex items-center gap-1"
        }><MdContactSupport size={20} />About Us</NavLink>
    </>;

    return (
        <>
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-base-100 shadow-lg z-50 flex flex-col transform transition-transform duration-300 
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <p onClick={() => setSidebarOpen(false)} className='absolute text-2xl right-5 top-3'>x</p>
                <div className="p-4 border-b border-gray-200 flex flex-col items-center">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full object-cover mb-2" />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-300 mb-2" />
                    )}
                    <h2 className="text-lg font-semibold text-[#FF3F33] text-center">{user?.displayName || 'User'}</h2>
                </div>

                <nav className="p-4 space-y-3 text-gray-700 font-medium flex-grow overflow-auto">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "bg-[#FF3F33] text-white font-semibold py-2 px-3 rounded flex items-center gap-1"
                                : "text-[#FF3F33] hover:bg-[#FFE5DC] font-semibold py-2 px-3 rounded flex items-center gap-1"
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        📊 Dashboard
                    </NavLink>
                    {links.props.children.map((link, i) => (
                        <div key={i} onClick={() => setSidebarOpen(false)}>{link}</div>
                    ))}
                </nav>

                {/* Bottom buttons */}
                <div className="p-4 border-t border-gray-200 space-y-3">
                    

                    <Link
                        to="/profile"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center justify-center gap-2 py-2 px-4 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer font-semibold text-gray-700"
                    >
                        <MdSettings size={22} /> Settings
                    </Link>

                    {user && (
                        <button
                            onClick={handleLogOut}
                            className="w-full bg-[#FF3F33] text-white py-2 rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>

            {/* Navbar */}
            <div
                className={`sticky z-40 backdrop-blur-lg inset-0 top-0 w-full transition-all duration-300
              ${sidebarOpen ? 'pl-64' : 'pl-0'}`}
            >
                <div className="w-11/12 mx-auto flex justify-between items-center">
                    <div className={`${sidebarOpen ? 'hidden md:flex ' : ''}flex items-center gap-2 cursor-pointer`} onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <img className="h-12" src="./logo.png" alt="Logo" />
                        <h3 className="unna-regular font-bold text-3xl">
                            Buy<span className="text-[#FF3F33] text-4xl">&</span>Bulk
                        </h3>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 space-x-0.5">
                            {links}
                        </ul>
                    </div>

                    <div className=" flex items-center gap-2">
                        <div className="hidden md:block">
                            <ThemeToggle />
                        </div>

                        {user ? (
                            <>
                                <Link to="/cart" className="relative ml-4">
                                    <div className="absolute -top-1 -right-1 bg-white text-[#FF3F33] border text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                                        <span className="font-bold">{carts}</span>
                                    </div>
                                    <FaShoppingCart className="text-[#FF3F33]" size={25} />
                                </Link>

                                <div className="dropdown dropdown-end">
                                    <details className="menu">
                                        <summary className="flex items-center gap-2 border border-[#FF3F33] rounded-full px-1 py-1 cursor-pointer hover:bg-[#FF3F33]/10 transition">
                                            <div className="p-0.5 bg-[#FF3F33] rounded-full">
                                                <img
                                                    src={user?.photoURL || "/default-user.png"}
                                                    alt="User Avatar"
                                                    className="h-8 w-8 rounded-full object-cover"
                                                />
                                            </div>
                                            <h4 className="font-bold mr-2 hidden md:block">{user?.displayName || "User"}</h4>
                                        </summary>

                                        <ul className="menu menu-sm dropdown-content shadow rounded-box mt-2 w-60 bg-red-100 text-gray-800">
                                            <Link to="/profile">
                                                <div className="flex items-center gap-2 overflow-hidden mb-4">
                                                    <img className="rounded-full h-9" src={user.photoURL} alt="user" />
                                                    <div>
                                                        <h4 className="font-bold">{user.displayName}</h4>
                                                        <p className="text-xs">{user.email}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <li>
                                                <Link to="/profile">
                                                    <p className="flex items-center gap-2 text-sm font-medium">
                                                        <span className="text-[#FF3F33] text-lg ">
                                                            <RxAvatar />
                                                        </span>
                                                        Profile
                                                    </p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/myOrders">
                                                    <p className="flex items-center gap-2 text-sm font-medium">
                                                        <span className="text-[#FF3F33] text-lg ">
                                                            <BsCartCheck />
                                                        </span>
                                                        My Orders
                                                    </p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link onClick={handleLogOut}>
                                                    <p className="flex items-center gap-2 text-sm font-medium">
                                                        <span className="text-[#FF3F33] text-lg ">
                                                            <MdLogout />
                                                        </span>
                                                        Log Out
                                                    </p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/Login"
                                    className="px-3.5 py-1.5 border border-[#FF3F33] text-[#FF3F33] rounded font-semibold hover:bg-[#FFE5DC]"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-3.5 py-1.5 border border-[#FF3F33] text-[#FF3F33] rounded font-semibold hover:bg-[#FFE5DC]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>



                </div>
            </div>
        </>
    );
};
export default Navbar;
