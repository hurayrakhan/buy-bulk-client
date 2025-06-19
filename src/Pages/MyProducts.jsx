import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Link } from 'react-router';

import MyProductCard from '../Components/Cards/MyProductCard';
import axios from 'axios';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet';

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);

    useEffect(() => {
        if (!user?.email) return;
        fetch(`https://assignment-11-server-lake-three.vercel.app/products/recruiter/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }, [user, ]);

    const handleUpdate = () => {
        axios.put(`https://assignment-11-server-lake-three.vercel.app/products/${editingProduct._id}`, editingProduct)
            .then(response => {
                if (response.data.modifiedCount > 0) {
                    setProducts(products.map(p =>
                        p._id === editingProduct._id ? editingProduct : p
                    ));
                    setEditingProduct(null);
                }   
                
            })
            .catch(error => {
                console.error("There was an error updating the product!", error);
            });
    };

            

    const handleDelete = () => {
        fetch(`https://assignment-11-server-lake-three.vercel.app/products/${deletingProduct._id}`, { method: 'DELETE' })
            .then(() => {
                setProducts(products.filter(p => p._id !== deletingProduct._id));
                setDeletingProduct(null);
            });
    };

    return (
        <div className="w-10/12 mx-auto my-10">
            <Helmet>
                <title>My Products | Buy&Bulk</title>
                <meta name="description" content="Manage your products on Buy&Bulk." />
            </Helmet>
            <h2 className="text-3xl text-center text-[#FF3F33] font-bold mb-8">My Products</h2>

            {products.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl font-semibold mb-4 text-gray-700">You haven't added any products yet !</p>
                    <Link
                        to={'/addProduct'}
                        className="bg-[#FF3F33] text-white font-semibold px-6 py-2 rounded hover:bg-red-600 transition"
                    >
                        Add a product first
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <Fade key={index} duration={1000}>
                            <MyProductCard
                            product={product}
                            setEditingProduct={setEditingProduct}
                            setDeletingProduct={setDeletingProduct}
                        ></MyProductCard>
                        </Fade>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-red-100 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-2xl border border-[#FF3F33] shadow-2xl shadow-red-400 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Edit Product</h3>

                        <label className="block mb-2">Product Name</label>
                        <input
                            type="text"
                            className="w-full border p-2 mb-2 rounded"
                            value={editingProduct.name}
                            onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        />

                        <label className="block mb-2">Category</label>
                        <input
                            type="text"
                            className="w-full border p-2 mb-2 rounded"
                            value={editingProduct.category}
                            onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        />

                        <label className="block mb-2">Price</label>
                        <input
                            type="number"
                            className="w-full border p-2 mb-2 rounded"
                            value={editingProduct.price}
                            onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                        />

                        <label className="block mb-2">Stock</label>
                        <input
                            type="number"
                            className="w-full border p-2 mb-2 rounded"
                            value={editingProduct.stock}
                            onChange={e => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                        />

                        <label className="block mb-2">Image URL</label>
                        <input
                            type="text"
                            className="w-full border p-2 mb-2 rounded"
                            value={editingProduct.image}
                            onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setEditingProduct(null)}
                                className="px-4 py-1 rounded border border-[#FF3F33] text-[#FF3F33] hover:bg-red-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="bg-[#FF3F33] text-white px-4 py-1 rounded hover:bg-red-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deletingProduct && (
                <div className="fixed inset-0 bg-red-100 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="rounded-2xl bg-white border border-[#FF3F33] shadow-2xl shadow-red-400 p-6 w-full max-w-md text-center">
                        <h3 className="text-xl font-bold mb-2">Confirm Deletion</h3>
                        <p className="mb-4">
                            Are you sure you want to delete <strong>{deletingProduct.name}</strong>?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setDeletingProduct(null)}
                                className="px-4 py-1 rounded border border-[#FF3F33] text-[#FF3F33] hover:bg-red-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProducts;
