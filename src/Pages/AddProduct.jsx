import { use, useState } from 'react';
import { useNavigate } from 'react-router';
import { IoMdAdd } from "react-icons/io";
import { User } from 'lucide-react';
import { AuthContext } from '../Providers/AuthProvider';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';


const AddProduct = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    image: '',
    name: '',
    stock: '',
    minOrderQty: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    rating: '',
    recruiter: user?.displayName || '',
    email: user?.email || ''
  });

  const categories = [
    'Electronics',
    'Apparel',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Footwear',
    'Books & Stationery',
    'Sports & Outdoors',
    'Toys & Games',
    'Health & Wellness',
    'Groceries',
    'Automotive',
    'Furniture'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    fetch('https://assignment-11-server-lake-three.vercel.app/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(product),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        return response.json();
      })
      .then(data => {
        console.log('Product added successfully:', data);
        toast.success('Product added successfully!'); 
        navigate('/myProducts');
      })
      .catch(error => {
        console.error('There was an error adding the product!', error);
        toast.error('Error adding product. Please try again.'); 
      });
  };




  return (
    <div className="min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Add Product | Buy&Bulk</title>
        <meta name="description" content="Add a new product to Buy&Bulk." />
      </Helmet>
      <section className="max-w-4xl mx-auto p-6 my-12  rounded-2xl bg-base-100 border border-[#FF3F33] shadow-2xl shadow-red-400">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-[#FF3F33] hover:underline font-semibold"
        >
          ← Back
        </button>
        <div className=' flex justify-center mb-6'>
          <h2 className="text-2xl md:text-3xl font-bold text-[#FF3F33] mb-6 flex items-center"><IoMdAdd />
            Add New Product</h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="url"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Upload Product cover image URL"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-[#FF3F33]"
            required
          />
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-[#FF3F33]"
            required
          />
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-[#FF3F33]"
            required
          />
          <input
            type="number"
            name="minOrderQty"
            value={product.minOrderQty}
            onChange={handleChange}
            placeholder="Minimum Selling Quantity (Wholesale)"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-[#FF3F33]"
            required
          />
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Brand Name"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-[#FF3F33]"
          />
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border border-gray-300 text-gray-400 rounded px-4 py-2 focus:outline-[#FF3F33]"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Short Description"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-[#FF3F33]"
            rows="3"
          ></textarea>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price (per quantity)"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-[#FF3F33]"
            required
          />
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-[#FF3F33]"
          />

          <div className='flex items-center gap-2 mt-5'>
            <div className='flex-1 border border-red-300'></div>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-500'>Recruiter Information</span>
            </div>
            <div className='flex-1 border border-red-300'></div>
          </div>
          {/* recruiter data*/}
          <input
            type="text"
            name="recruiter"
            value={user.displayName || ''}

            className="border border-gray-300 text-gray-600 rounded px-4 py-2 focus:outline-[#FF3F33]"
            readOnly
            disabled
          />
          <input
            type="email"
            name="email"
            value={product.email || ''}
            className="border border-gray-300 text-gray-600 rounded px-4 py-2 focus:outline-[#FF3F33]"
            readOnly
            disabled
          />

          <button
            type="submit"
            className="bg-[#FF3F33] hover:bg-[#e3362c] text-white font-bold py-2 px-6 rounded mt-4 transition"
          >
            Add Product
          </button>

          <div className="text-sm text-gray-500 mt-4">
            <strong>Product Content:</strong> Please ensure the product information is accurate. All submissions are reviewed before being listed on the platform.
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddProduct;
