import React, { use, } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../Providers/AuthProvider';
import ThemeToggle from './ThemeToggle';
import { MdLogout } from "react-icons/md";
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
    const { carts } = use(CartContext);
    const { user, signOutUser } = use(AuthContext);
    const { categoryName } = useParams();
    const category = categoryName || 'All';

    const navigate = useNavigate();



    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                navigate('/login')
                Swal.fire({
                    title: "LogOut Successful!",
                    text: `Logged out!, ${user.displayName || 'User'}!`,
                    icon: "success",
                    confirmButtonText: "Continue"
                })
            })
            .catch(error => {
                Swal.fire({
                    title: "LogOut Failed",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Retry"
                });
            })
    }

    const links = <>
        <li><NavLink to="/" className={({ isActive }) =>
            isActive
                ? "bg-[#FF3F33] text-white font-semibold py-2 px-3 rounded"
                : "text-[#FF3F33] hover:bg-[#FFE5DC] font-semibold py-2 px-3 rounded"
        }><FaHome size={20} />Home</NavLink></li>
        <li><NavLink to={`/category/${category}`} className={({ isActive }) =>
            isActive
                ? "bg-[#FF3F33] text-white font-semibold py-2 px-3 rounded"
                : "text-[#FF3F33] hover:bg-[#FFE5DC] font-semibold py-2 px-3 rounded"
        }><AiFillProduct size={20} />All Products</NavLink></li>

        {
            user ?

                <><li><NavLink to="/addProduct" className={({ isActive }) =>
                    isActive
                        ? "bg-[#FF3F33] text-white font-semibold py-2 px-3 rounded"
                        : "text-[#FF3F33] hover:bg-[#FFE5DC] font-semibold py-2 px-3 rounded"
                }><IoBagAdd size={20} />Add Product</NavLink></li>

                    <li><NavLink to="/myProducts" className={({ isActive }) =>
                        isActive
                            ? "bg-[#FF3F33] text-white font-semibold py-2 px-3 rounded"
                            : "text-[#FF3F33] hover:bg-[#FFE5DC] font-semibold py-2 px-3 rounded"
                    }><FaHandHoldingHeart size={20} />My Products</NavLink></li></>


                : <></>
        }

        <li><NavLink to="/aboutUs" className={({ isActive }) =>
            isActive
                ? "bg-[#FF3F33] text-white font-semibold py-2 px-3 rounded"
                : "text-[#FF3F33] hover:bg-[#FFE5DC] font-semibold py-2 px-3 rounded"
        }><MdContactSupport size={20} />About Us</NavLink></li>
    </>


    return (
        <div className=' sticky z-20 backdrop-blur-lg inset-0 top-0  w-full'>
            <div className="w-11/12 mx-auto  navbar  ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <Link to={'/'} className=" flex items-center relative">
                        <img className='h-12' src="./logo.png" alt="" />
                        <h3 className='unna-regular font-bold text-3xl'>Buy<span className='text-[#FF3F33] text-4xl'>&</span>Bulk</h3>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-0.5">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end gap-2">

                    <div className='hidden md:block'>
                        <ThemeToggle></ThemeToggle>
                    </div>
                    {
                        user ?
                            <div className='flex items-center gap-2'>
                                <Link to={'/cart'}>
                                    <div className='relative ml-4'>
                                        <div className='absolute -top-1 -right-1 bg-white text-[#FF3F33] border text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center'>
                                            <span className='font-bold'>{carts}</span>
                                        </div>
                                        <FaShoppingCart className='text-[#FF3F33]' size={25} />
                                    </div>
                                </Link>
                                <div className="dropdown dropdown-end">
                                    <details className="menu">
                                        <summary className="flex items-center gap-2 border border-[#FF3F33] rounded-full  px-1 py-1 cursor-pointer hover:bg-[#FF3F33]/10 transition">
                                            <div className="p-0.5 bg-[#FF3F33] rounded-full">
                                                <img
                                                    src={user?.photoURL || "/default-user.png"}
                                                    alt="User Avatar"
                                                    className="h-8 w-8 rounded-full object-cover"
                                                />
                                            </div>
                                            <h4 className=" font-bold mr-2 hidden md:block">{user?.displayName || "User"}</h4>
                                        </summary>

                                        <ul className="menu menu-sm dropdown-content shadow rounded-box mt-2 w-60 bg-red-100 text-gray-800">
                                            <Link to={'/profile'}>
                                                <div className='flex items-center gap-2 overflow-hidden mb-4'>
                                                    <img className='rounded-full h-9' src={user.photoURL} alt="user" />
                                                    <div>
                                                        <h4 className='font-bold'>{user.displayName}</h4>
                                                        <p className='text-xs'>{user.email}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <li>
                                                <Link to={'/profile'}>
                                                    <p className='flex items-center gap-2 text-sm font-medium'><span className='text-[#FF3F33] text-lg '><RxAvatar /></span>
                                                        Profile</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/myOrders'}>
                                                    <p className='flex items-center gap-2 text-sm font-medium'><span className='text-[#FF3F33] text-lg '><BsCartCheck /></span>
                                                        My Orders</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link onClick={handleLogOut}>
                                                    <p className='flex items-center gap-2 text-sm font-medium'><span className='text-[#FF3F33] text-lg '><MdLogout /></span>
                                                        Log Out</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </div>

                            </div>
                            :
                            <>
                                <Link to={'/Login'} className='px-3.5 py-1.5 border border-[#FF3F33] text-[#FF3F33] rounded font-semibold hover:bg-[#FFE5DC] '>Login</Link>
                                <Link to={'/register'} className='px-3.5 py-1.5 border border-[#FF3F33] text-[#FF3F33] rounded font-semibold hover:bg-[#FFE5DC] '>Register</Link>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;