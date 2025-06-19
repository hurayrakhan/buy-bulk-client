import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`https://assignment-11-server-lake-three.vercel.app/myOrders?email=${user.email}`, {
          headers: {
            authorization : `Bearer ${user.accessToken}`
          }
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        toast.error('Failed to load your orders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, orders]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this order?');
    if (!confirm) return;

    try {
      const res = await fetch(`https://assignment-11-server-lake-three.vercel.app/orders/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success('Order deleted!');
        setOrders(prev => prev.filter(order => order._id !== id));
      } else {
        toast.error('Failed to delete order.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting.');
    }
  };

  return (
    <section className="w-11/12 lg:w-9/12 mx-auto py-12">
      <Helmet>
        <title>My Orders | Buy&Bulk</title>
        <meta name="description" content="View and manage your recent orders from Buy&Bulk." />
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-[#FF3F33]">My Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading your orders...</p>
      ) : orders.length === 0 ? (

        <div className="text-center py-20">
          <p className="text-xl font-semibold mb-4 text-gray-700">You haven't placed any orders yet !</p>
          <Link
            to={'/category/All'}
            className="bg-[#FF3F33] text-white font-semibold px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Order Now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center gap-4 border border-red-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:shadow-red-400 transition bg-white relative"
            >
              <img
                src={order.productImage}
                alt={order.productName}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1 space-y-0.5">
                <h3 className="text-lg font-semibold text-gray-800">{order.productName}</h3>
                <p className="text-xs text-gray-500">Ordered on: <span className="text-gray-700">{order.buyingTime}</span></p>
                <p className="text-xs text-gray-500">Qty: <span className="text-gray-700">{order.quantity}</span> @ ${order.productPrice}</p>
                <p className="text-sm text-gray-700 font-medium">
                  Total: ${(order.productPrice * order.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(order._id)}
                title="Delete this order"
                className="p-2 hover:bg-red-100 rounded-full text-red-500 absolute top-3 right-3"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyOrders;
