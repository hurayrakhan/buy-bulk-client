import React, { use, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { CartContext } from '../Providers/CartProvider';

const CartPage = () => {
    const { user } = useContext(AuthContext);
    const {carts, setCarts} = use(CartContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://assignment-11-server-lake-three.vercel.app/myCarts?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
                .then((res) => res.json())
                .then((data) => setCartItems(data));
        }
    }, [user, cartItems]);

    const handleRemove = async (id, productId, quantity) => {
        const res = await fetch(`https://assignment-11-server-lake-three.vercel.app/carts/${id}`, {
            method: 'DELETE',
        })
        const data = await res.json();

        if (data.deletedCount > 0) {
            toast.success('Product removed from cart successfully!')
            setCarts(carts -1)
            setCartItems((prev) => prev.filter((item) => item._id !== id))
            await fetch(`https://assignment-11-server-lake-three.vercel.app/products/increase-stock/${productId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity }),
            });
        }
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="w-10/12 mx-auto my-12 px-4">
            <Helmet>
                <title>My Cart | Buy&Bulk</title>
                <meta name="description" content="View and manage your shopping cart on Buy&Bulk." />
            </Helmet>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FF3F33] mb-6 text-center">🛒 My Cart</h2>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>You have no items in your cart.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-md p-4 rounded-xl"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-32 h-32 object-cover rounded-lg border"
                            />
                            <div className="flex-1 w-full">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-500 text-sm mb-1">Price: ${item.price}</p>
                                <p className="text-gray-500 text-sm mb-1">Quantity: {item.quantity}</p>
                                <p className="text-gray-700 font-medium">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <button
                                onClick={() => handleRemove(item._id, item.productId, item.quantity)}
                                className="text-red-500 border border-red-500 px-4 py-1 rounded hover:bg-red-100"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="text-right text-xl font-semibold text-[#FF3F33]">
                        Total: ${total.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
