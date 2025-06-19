import React, { use, useEffect, useState } from 'react';
import './Allproducts.css';
import { FaThLarge, FaList } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { IoIosSearch } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router';
import { Fade } from 'react-awesome-reveal';

const categoryPromise = fetch('https://assignment-11-server-lake-three.vercel.app/categories').then(res => res.json());

const AllProductsTabs = ({ productsData }) => {
  const categoryObj = useParams();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState(categoryObj.categoryName || 'All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const navigate = useNavigate();
  const categoryData = use(categoryPromise);
  const categories = categoryData.map(cat => cat.name);
  const allCategories = ['All', ...categories];

  // Apply filters and sorting
  useEffect(() => {
    const updated = productsData
      .filter(
        (product) =>
          (selectedCategory === 'All' || product.category === selectedCategory) &&
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === 'asc') return a.price - b.price;
        if (sortOrder === 'desc') return b.price - a.price;
        return 0;
      });

    setFilteredProducts(updated);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [productsData, selectedCategory, searchQuery, sortOrder]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryChange = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="my-10">
      {/* Control Panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        {/* Category Filter */}
        <div className="sm:w-1/3 lg:w-1/5 relative group">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800 group-focus-within:text-[#FF3F33] transition-colors duration-200 z-10">
            <FiFilter size={20} />
          </span>
          <select
            className="select  pl-10 select-md w-full border border-[#FF3F33] focus:outline-none focus:border-[#FF3F33] focus:ring-2 focus:ring-red-300"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              handleCategoryChange(e.target.value);
            }}
          >

            {
              allCategories.map((category) => (
                <option key={category}
                  value={category}
                >{category}</option>

              ))
            }
          </select>
        </div>

        {/* Search */}
        <div className="sm:w-1/3 lg:w-1/2  relative group">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800 group-focus-within:text-[#FF3F33] transition-colors duration-200 z-10">
            <IoIosSearch size={20} />
          </span>
          <input
            type="text"
            placeholder="Search products..."
            className="input  pl-10 input-md input-bordered w-full border border-[#FF3F33] focus:outline-none focus:border-[#FF3F33] focus:ring-2 focus:ring-red-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Sort + View Mode */}
        <div className="sm:w-1/4 flex justify-end gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`btn btn-md ${viewMode === 'grid' ? 'bg-[#FF3F33] text-white' : 'bg-base-300'}`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`btn btn-md ${viewMode === 'list' ? 'bg-[#FF3F33] text-white' : 'bg-base-300'}`}
          >
            <FaList />
          </button>
          <select
            className="select select-md border border-[#FF3F33] focus:outline-none focus:border-[#FF3F33] focus:ring-2 focus:ring-red-300"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      {/* Product Display */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'flex flex-col gap-4'
        }
      >
        {currentProducts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No products found.</p>
        ) : (
          currentProducts.map((product, index) => (
            <Fade key={index} duration={1000}>
              <div
                className={`group relative transition-all duration-300 rounded-2xl overflow-hidden border border-[#FF3F33] bg-red-100 hover:shadow-lg hover:shadow-red-500 ${viewMode === 'list' ? 'flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4' : 'w-full max-w-sm'}`}
              >
                {/* Stock Badge */}
                <div className="absolute top-2 right-2 z-10">
                  {product.stock > 0 ? (
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Product Image */}
                <div
                  className={`overflow-hidden bg-white ${viewMode === 'list' ? 'w-full sm:w-48 h-48 rounded-xl' : 'w-full h-52 rounded-t-2xl'}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Details */}
                <div className={`${viewMode === 'list' ? 'flex-1 space-y-2' : 'p-4 space-y-2 rounded-b-2xl bg-red-100'}`}>
                  <h2 className="text-lg font-bold text-red-900 group-hover:text-red-600 transition">
                    {product.name}
                  </h2>
                  <p className="text-sm text-red-800">Brand: {product.brand}</p>
                  <p className="text-xs text-red-800">MOQ: {product.minOrderQty}</p>
                  <p className="text-xs text-red-700">Category: {product.category}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-[#C53030]">${product.price}</span>
                    <span className="text-sm text-yellow-600 font-semibold">⭐ {product.rating}</span>
                  </div>
                  <Link to={`/productDetails/${product._id}`} className="mt-3 btn btn-sm bg-[#FF3F33] text-white w-full hover:bg-[#e02a21] transition">
                    View Details
                  </Link>
                </div>
              </div>
            </Fade>
          ))
        )}
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {/* Prev */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-sm border border-[#FF3F33] text-[#FF3F33] hover:bg-[#FF3F33] hover:text-white"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {currentPage > 2 && (
            <button
              onClick={() => setCurrentPage(1)}
              className={`btn btn-sm border border-[#FF3F33] text-[#FF3F33]`}
            >
              1
            </button>
          )}

          {currentPage > 3 && (
            <span className="px-2 py-1 text-gray-500">...</span>
          )}

          {/* Nearby Pages */}
          {[currentPage - 1, currentPage, currentPage + 1].map((page) =>
            page > 1 && page < totalPages ? (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn btn-sm ${currentPage === page ? 'bg-[#FF3F33] text-white' : 'border border-[#FF3F33] text-[#FF3F33]'}`}
              >
                {page}
              </button>
            ) : null
          )}

          {currentPage < totalPages - 2 && (
            <span className="px-2 py-1 text-gray-500">...</span>
          )}

          {totalPages !== 1 && currentPage !== totalPages && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="btn btn-sm border border-[#FF3F33] text-[#FF3F33]"
            >
              {totalPages}
            </button>
          )}

          {/* Next */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn btn-sm border border-[#FF3F33] text-[#FF3F33] hover:bg-[#FF3F33] hover:text-white"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
};

export default AllProductsTabs;
