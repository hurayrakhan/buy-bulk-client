import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://assignment-11-server-lake-three.vercel.app/orders?email=${user.email}`,  {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
        .then(res => res.json())
        .then(setOrders);

      fetch(`https://assignment-11-server-lake-three.vercel.app/carts?email=${user.email}`,  {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
        .then(res => res.json())
        .then(setCart);
    }
  }, [user]);

  const totalSpent = orders.reduce((sum, o) => sum + o.quantity * o.productPrice, 0);
  const cartValue = cart.reduce((sum, c) => sum + c.quantity * c.price, 0);

  return (
    <div className="min-h-screen flex bg-red-50">
      <Helmet>
        <title>Dashboard | Buy&Bulk</title>
      </Helmet>

      {/* Sidebar */}
      <div className={`fixed md:static z-30 bg-white shadow-lg h-screen w-64 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b border-gray-200 flex flex-col items-center">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full object-cover mb-2" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 mb-2" />
          )}
          <h2 className="text-lg font-semibold text-[#FF3F33] text-center">{user?.displayName || 'User'}</h2>
        </div>
        <nav className="p-4 space-y-4 text-gray-700 font-medium">
          <Link to="/dashboard" className="block hover:text-[#FF3F33]">📊 Dashboard</Link>
          <Link to="/myOrders" className="block hover:text-[#FF3F33]">📦 My Orders</Link>
          <Link to="/cart" className="block hover:text-[#FF3F33]">🛒 My Cart</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navbar (Mobile) */}
        <div className="bg-white p-4 shadow-md flex justify-between items-center md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-[#FF3F33]">
            <Menu />
          </button>
          <div className="flex items-center gap-2">
            {user?.photoURL && (
              <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full object-cover" />
            )}
            <p className="font-semibold text-[#FF3F33]">Dashboard</p>
          </div>
        </div>

        <div className="p-6">
          {/* Welcome Message */}
          <h2 className="text-3xl font-bold text-[#FF3F33] mb-4">Welcome, {user?.displayName || 'User'}!</h2>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <StatBox title="Total Orders" value={orders.length} color="[#FF3F33]" />
            <StatBox title="Total Spent" value={`$${totalSpent.toFixed(2)}`} color="green-600" />
            <StatBox title="Cart Items" value={cart.length} color="[#FF3F33]" />
            <StatBox title="Cart Value" value={`$${cartValue.toFixed(2)}`} color="yellow-600" />
            <div className="bg-white p-5 rounded-lg border-l-4 border-[#FF3F33] shadow">
              <h3 className="text-xl font-semibold mb-1">Profile</h3>
              <p><strong>Name:</strong> {user?.displayName}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-xl shadow border border-red-100">
            <h3 className="text-2xl font-semibold text-[#FF3F33] mb-4">Recent Orders</h3>
            {orders.slice(0, 5).map(order => (
              <div key={order._id} className="border-b py-3 last:border-b-0 flex justify-between items-center">
                <div>
                  <p className="font-medium">{order.productName}</p>
                  <p className="text-sm text-gray-500">Qty: {order.quantity} • ${order.productPrice}</p>
                </div>
                <p className="text-sm text-gray-600">{order.buyingTime}</p>
              </div>
            ))}
            {orders.length === 0 && <p className="text-gray-400">No orders placed yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// StatBox Component
const StatBox = ({ title, value, color }) => (
  <div className={`bg-white p-6 rounded-xl shadow border-l-4 border-${color}`}>
    <h3 className="text-xl font-semibold mb-1">{title}</h3>
    <p className={`text-3xl font-bold text-${color}`}>{value}</p>
  </div>
);

export default Dashboard;
