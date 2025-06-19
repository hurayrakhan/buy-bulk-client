import React, { useState, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Pencil, Star } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { CartContext } from '../Providers/CartProvider';
import { Helmet } from 'react-helmet';

const ProductDetails = () => {
  const product = useLoaderData();
  const { user } = useContext(AuthContext);
  const { updateCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(product.minOrderQty);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: product.name,
    brand: product.brand,
    category: product.category,
    image: product.image,
    rating: product.rating,
    description: product.description,
    stock: product.stock || 0,
    price: product.price,
    minOrderQty: product.minOrderQty,
  });

  const handleDecrease = () => {
    if (quantity > product.minOrderQty) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleBuy = async () => {
    if (quantity < product.minOrderQty) {
      toast.warning(`Minimum order quantity is ${product.minOrderQty}`);
      return;
    }
    if(quantity > product.stock){
      toast.warning(`Oops! We only have ${product.stock} in stock.`);
    }
    const date = format(new Date(), "dd MMMM yyyy 'at' hh:mm a");
    const orderInfo = {
      productId: product._id,
      productName: product.name,
      buyingTime: date,
      productImage: product.image,
      productPrice: product.price,
      buyerEmail: user.email,
      buyerName: user.displayName,
      quantity,
    };

    try {
      const res = await fetch(`https://assignment-11-server-lake-three.vercel.app/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderInfo),
      });
      const data = await res.json();
      if (data.insertedId) {
        toast.success('Order placed successfully!');
        setShowModal(false);
        await fetch(`https://assignment-11-server-lake-three.vercel.app/products/decrease-stock/${product._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity }),
        });
        navigate('/myOrders');
      } else {
        toast.error('Failed to place order!');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while placing the order.');
    }
  };

  const handleAddToCart = async () => {
    const cartItem = {
      productId: product._id,
      productName: product.name,
      buyerEmail: user.email,
      buyerName: user.displayName,
      quantity,
      image: product.image,
      price: product.price,
    };
    try {
      const res = await fetch(`https://assignment-11-server-lake-three.vercel.app/carts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem),
      });
      const data = await res.json();
      if (data.insertedId) {
        toast.success('Added to cart!');
        updateCartCount();
        navigate('/cart')
        await fetch(`https://assignment-11-server-lake-three.vercel.app/products/decrease-stock/${product._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity }),
        });
      } else {
        toast.error('Failed to add to cart!');
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error)
    }
  };

  const handleEditSubmit = async () => {
    const updatedFields = {};

    // Compare edited fields with original product
    Object.keys(editData).forEach(key => {
      if (editData[key] !== product[key]) {
        updatedFields[key] = editData[key];
      }
    });

    // If nothing was changed
    if (Object.keys(updatedFields).length === 0) {
      toast.info('No changes to update.');
      return;
    }

    try {
      const res = await fetch(`https://assignment-11-server-lake-three.vercel.app/products/${product._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success('Product updated successfully!');
        setShowEditModal(false);
        window.location.reload();
      } else {
        toast.error('No changes were made.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Update failed.');
    }
  };


  return (
    <div className="min-h-screen bg-red-100 flex justify-center items-center px-4 py-10">
      <Helmet>
        <title>{product.name} | Buy&Bulk</title>
      </Helmet>

      <div className="bg-white w-full max-w-5xl rounded-2xl border border-[#FF3F33] shadow-2xl shadow-red-300 grid md:grid-cols-2 overflow-hidden relative animate__animated animate__fadeInUp">
        <button
          onClick={() => setShowEditModal(true)}
          className="absolute top-4 right-4 bg-[#FF3F33] text-white p-2 rounded-full hover:bg-red-600 shadow z-50"
        >
          <Pencil size={18} />
        </button>

        <Fade>
          <div className="bg-base-200 p-6">
            <img src={product.image} alt={product.name} className="w-full h-auto object-contain rounded-xl" />
          </div>
        </Fade>

        <Fade direction="right">
          <div className="p-8 flex flex-col justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-[#FF3F33]">{product.name}</h2>
              <p className="text-sm text-gray-500 mt-1">by {product.brand} • {product.category}</p>
              <div className="flex items-center gap-2 mt-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-500' : ''}`} />
                ))}
                <span className="text-sm text-gray-400">({product.rating})</span>
              </div>
              <p className="text-gray-600 mt-4">{product.description}</p>
              <p className="mt-2 text-sm font-semibold">
                Status:{' '}
                {product.stock > 1 ? (
                  <span className="text-green-600">In Stock ({product.stock})</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xl font-semibold text-[#FF3F33]">${product.price} / Pcs</p>
              <p className="text-sm text-gray-500">Minimum Order Quantity: <span className="font-medium">{product.minOrderQty}</span></p>

              <div className="flex items-center gap-3">
                <label htmlFor="quantity" className="text-gray-700 font-medium">Order Qty:</label>
                <input
                  id="quantity"
                  type="number"
                  min={product.minOrderQty}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-24 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-[#FF3F33] focus:ring-2 focus:ring-[#FF3F33]"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleAddToCart} className="btn bg-[#FF3F33] text-white px-5 py-2 rounded-md shadow">Add to Cart</button>
                <button onClick={() => setShowModal(true)} disabled={product.stock < 1} className="btn border border-[#FF3F33] text-[#FF3F33] bg-white px-5 py-2 rounded-md shadow">Buy Now</button>
              </div>
            </div>
          </div>
        </Fade>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[#FF3F33]/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md border border-[#FF3F33] shadow-2xl shadow-red-400">
            <h3 className="text-xl font-bold mb-4">Confirm Your Purchase</h3>
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Product:</strong> {product.name}</p>
            <div className="flex items-center gap-3 my-4">
              <span>Quantity:</span>
              <button onClick={handleDecrease} className="px-3 py-1 bg-gray-200 rounded">-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrease} className="px-3 py-1 bg-gray-200 rounded">+</button>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleBuy} className="px-4 py-2 bg-[#FF3F33] text-white rounded">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-[#FF3F33]/20 flex items-center justify-center z-50">
          <div className="rounded-2xl bg-white border border-[#FF3F33] shadow-2xl shadow-red-500 p-6 w-full max-w-xl">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <div className="grid grid-cols-1 gap-4">
              {['name', 'brand', 'image', 'rating', 'description', 'stock', 'price', 'minOrderQty'].map((field) => (
                <input
                  key={field}
                  type={field === 'rating' || field === 'stock' || field === 'minOrderQty' || field === 'price' ? 'number' : 'text'}
                  placeholder={`Enter ${field}`}
                  value={editData[field]}
                  onChange={(e) => setEditData({ ...editData, [field]: field === 'rating' || field === 'stock' || field === 'minOrderQty' || field === 'price' ? Number(e.target.value) : e.target.value })}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-[#FF3F33] focus:ring-2 focus:ring-[#FF3F33]"
                />
              ))}
              <select
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-[#FF3F33] focus:ring-2 focus:ring-[#FF3F33]"
              >
                <option>Electronics</option>
                <option>Apparel</option>
                <option>Furniture</option>
                <option>Health & Wellness</option>
                <option>Beauty & Personal Care</option>
                <option>Toys & Games</option>
              </select>
            </div>
            <div className="flex justify-end mt-6 gap-3">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleEditSubmit} className="px-4 py-2 bg-[#FF3F33] text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
