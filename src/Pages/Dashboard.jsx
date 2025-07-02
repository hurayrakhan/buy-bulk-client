import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';
import { Menu } from 'lucide-react';

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
    <div className="min-h-screen bg-[#FFF5F2] flex">
      <Helmet><title>Dashboard | Buy&Bulk</title></Helmet>

      {/* Sidebar */}
      <aside className={`fixed md:static z-30 bg-base-100 w-64 shadow-lg h-screen transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col items-center py-6 border-b">
          <img src={user?.photoURL || '/default-user.png'} alt="User" className="w-20 h-20 rounded-full object-cover" />
          <h2 className="mt-3 font-bold text-[#FF3F33] text-lg">{user?.displayName || 'User'}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <nav className="mt-6 px-4 flex flex-col gap-4 font-medium text-gray-700">
          <SidebarLink to="/dashboard" label="Dashboard" />
          <SidebarLink to="/myOrders" label="My Orders" />
          <SidebarLink to="/cart" label="My Cart" />
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Mobile topbar */}
        <div className="md:hidden flex justify-between items-center bg-base-100 px-4 py-3 shadow">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="text-[#FF3F33]" />
          </button>
          <span className="text-[#FF3F33] font-semibold">Dashboard</span>
        </div>

        <main className="p-6">
          <h1 className="text-3xl font-bold text-[#FF3F33] mb-4 py-4">Welcome, {user?.displayName || 'User'}!</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <StatBox title="Total Orders" value={orders.length} color="red" />
            <StatBox title="Total Spent" value={`$${totalSpent.toFixed(2)}`} color="green" />
            <StatBox title="Cart Items" value={cart.length} color="red" />
            <StatBox title="Cart Value" value={`$${cartValue.toFixed(2)}`} color="yellow" />
          </div>

          {/* Recent Orders */}
          <div className="bg-white shadow rounded-lg p-6 border-t-4 border-[#FF3F33]">
            <h2 className="text-2xl font-semibold text-[#FF3F33] mb-4">Recent Orders</h2>
            {orders.length ? (
              <div className="space-y-4">
                {orders.slice(0, 5).map(order => (
                  <div key={order._id} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-semibold">{order.productName}</p>
                      <p className="text-sm text-gray-500">Qty: {order.quantity} • ${order.productPrice}</p>
                    </div>
                    <span className="text-sm text-gray-600">{order.buyingTime}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No recent orders available.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// Sidebar link component
const SidebarLink = ({ to, label }) => (
  <Link to={to} className="hover:text-[#FF3F33] transition-colors">
    {label}
  </Link>
);

// StatBox component
const StatBox = ({ title, value, color }) => {
  const colorMap = {
    red: 'border-red-500 text-red-600',
    green: 'border-green-500 text-green-600',
    yellow: 'border-yellow-500 text-yellow-600'
  };

  return (
    <div className={`bg-white shadow border-l-4 p-5 rounded-lg ${colorMap[color]}`}>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className={`text-2xl font-bold ${colorMap[color]}`}>{value}</p>
    </div>
  );
};

export default Dashboard;
