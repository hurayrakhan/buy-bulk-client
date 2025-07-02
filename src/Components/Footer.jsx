import React from "react";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter, 
    FaGithub,
} from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-base-100 ">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand Section */}
                <div>
                    <div>
                        <Link to={'/'} className=" flex items-center relative">
                            <img className='h-10' src="./logo.png" alt="" />
                            <h3 className='unna-regular font-bold text-2xl'>Buy<span className='text-[#FF3F33] text-4xl'>&</span>Bulk</h3>
                        </Link>
                    </div>
                    <p className="mt-4 text-sm">
                        Your trusted platform for buying in bulk at wholesale prices.
                        Simplify your procurement with ease and confidence.
                    </p>
                    <div className="flex gap-4 mt-4 text-xl text-gray-600">
                        <a href="https://www.linkedin.com/in/hurayrakhan/" target="_blank" className="hover:text-[#FF3F33]"><FaLinkedinIn /></a>
                        <a href="https://github.com/hurayrakhan" target="_blank" className="hover:text-[#FF3F33]"><FaGithub /></a>
                        <a href="https://www.facebook.com/hurayra.khan.965/" target="_blank" className="hover:text-[#FF3F33]"><FaFacebookF /></a>
                        <a href="https://www.instagram.com/_hurayra_khan/"  target="_blank" className="hover:text-[#FF3F33]"><FaInstagram /></a>
                        <a href="https://x.com/imhurayrakhan" target="_blank" className="hover:text-[#FF3F33]"><FaXTwitter /></a>
                    </div>
                </div>

                {/* For Buyers */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">For Buyers</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to={'/category/All'} className="hover:text-[#FF3F33]">Browse Products</Link></li>
                        <li><Link to={'/category/All'} className="hover:text-[#FF3F33]">Bulk Deals</Link></li>
                        <li><Link to={'/myOrders'} className="hover:text-[#FF3F33]">Order Dashboard</Link></li>
                        <li><Link to={'/cart'} className="hover:text-[#FF3F33]">Saved Lists</Link></li>
                        <li><Link to={'/aboutUs'} className="hover:text-[#FF3F33]">Support</Link></li>
                    </ul>
                </div>

                {/* For Suppliers */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">For Suppliers</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to={'/addProduct'} className="hover:text-[#FF3F33]">Sell on Buy$Bulk</Link></li>
                        <li><Link to={'/'} className="hover:text-[#FF3F33]">Pricing Plans</Link></li>
                        <li><Link to={'/dashboard'} className="hover:text-[#FF3F33]">Supplier Dashboard</Link></li>
                        <li><Link to={'/'} className="hover:text-[#FF3F33]">Manage Inventory</Link></li>
                        <li><Link to={'/myProducts'} className="hover:text-[#FF3F33]">Seller Resources</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Stay Updated</h3>
                    <p className="text-sm mb-3">
                        Subscribe to get bulk buying tips, offers, and updates.
                    </p>
                    <form className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="px-4 py-2 border rounded-md text-sm outline-[#FF3F33]"
                        />
                        <button
                            type="submit"
                            className="bg-[#FF3F33] text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2">
                        By subscribing, you agree to our{" "}
                        <a href="#" className="underline ">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t text-center text-xs text-gray-500 py-4 mt-6">
                <p>
                    © 2025 Buy$Bulk. All rights reserved. | Developed by{" "}
                    <a href="https://github.com/hurayrakhan" target="_blank" className="text-[#FF3F33] font-medium">
                        Abu Hurayra Khan
                    </a>
                </p>

            </div>
        </footer>
    );
};

export default Footer;
