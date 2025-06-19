import React, { use, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Link, useNavigate } from 'react-router';

const limitedCategoriesPromise = fetch('https://assignment-11-server-lake-three.vercel.app/categories/limit8')
    .then(res => res.json());
const categoriesPromise = fetch('https://assignment-11-server-lake-three.vercel.app/categories')
    .then(res => res.json());


const Categories = () => {

    const allCategories = use(categoriesPromise);
    const limitedCategories = use(limitedCategoriesPromise);

    const [categories, setCategories] = useState(limitedCategories);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    const handleShowAll = () => {
        if (showAll) {
            setCategories(limitedCategories);
        } else {
            setCategories(allCategories);
        }
        setShowAll(!showAll);
    };



    if (!categories) {
        return <div>Loading...</div>;
    }

    // view products button handler
    const handleViewProducts = (categoryName) => {
        // Navigate to the category products page

        // This can be done using react-router's useNavigate or Link component
        // For example:
        navigate(`/category/${categoryName}`);
    };
    return (
        <div className='w-10/12 mx-auto my-10'>
            <div className='border-l-6 border-l-[#FF3F33] py-4 '>
                <h2 className="text-3xl font-bold mx-4">Categories</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6 mt-10">
                {categories.map(category =>
                    <Fade key={category.id} duration={1000}>
                        <div
                        
                        className="relative h-40 md:h-60 rounded-2xl overflow-hidden group shadow-2xl border border-gray-200 hover:shadow-[#FF3F33]/50 transition-shadow duration-500"
                    >
                        {/* Background Image */}
                        <img
                            src={category.image}
                            alt={category.name}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-center items-center text-center p-5">
                            <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow mb-3">
                                {category.name}
                            </h2>
                            <p className="text-sm md:text-base text-white drop-shadow mb-5 line-clamp-3">
                                {category.description}
                            </p>
                            <Link onClick={() => handleViewProducts(category.name)} className="bg-[#FF3F33] hover:bg-[#e0382d] text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-[#FF3F33]/70 transition-all duration-300 ease-in-out">
                                View Products
                            </Link>
                        </div>
                    </div>

                    </Fade>
                )}
            </div>

            <div className='text-center mt-10'>
                <button onClick={handleShowAll} className="px-4 py-2 rounded text-base-100 bg-[#FF3F33] hover:bg-[#e0382d] font-semibold mt-5 inline-block">
                    {showAll ? 'View Less' : 'View All Categories'}

                </button>
            </div>
        </div>
    );
};

export default Categories;