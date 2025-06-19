import React from 'react';
import { Link } from 'react-router';

const CallToActionBanner = () => {
    return (
        <div className=" w-11/12 mx-auto bg-red-100 py-10 text-gray-700 px-6 md:px-20 text-center rounded-xl  mt-12 shadow-lg hover:shadow-red-400 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Bulk Buy? Start Browsing Now
            </h2>
            <p className="text-lg mb-6">Explore thousands of wholesale products from trusted suppliers.</p>
            <Link
                to="/category/All"
                className="inline-block bg-white text-[#FF3F33] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-100 transition"
            >
                Start Shopping
            </Link>
        </div>
    );
};

export default CallToActionBanner;
