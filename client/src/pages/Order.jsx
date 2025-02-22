import { useEffect, useState } from "react";
import { useAuth } from "../store/auth"; // Ensure this provides user info
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Orders = () => {
  const { user } = useAuth(); // Getting logged-in user details
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/order/getAllOrder/${user._id}`);
        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders);
        } else {
          console.error("Error fetching orders:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300">
        <p className="text-xl text-gray-800 font-semibold animate-pulse">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10">
        <h2 className="mt-7">
  <Link 
    to="/"  
    className="font-bold mx-75 mb-5 text-2xl text-violet-500 border border-violet-500 rounded-lg px-4 py-2 inline-block"
  >
    Home
  </Link>
</h2>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">🛍️ Your Orders</h2>

        {orders.length === 0 ? (
          <p className="text-center text-lg text-gray-700">No orders found. Start shopping now! 🛒</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                className="flex items-center bg-white shadow-md rounded-lg p-5 transition-all duration-300 hover:shadow-2xl border-l-8 border-blue-500"
                whileHover={{ scale: 1.02 }}
              >
                {order.items[0]?.productId?.images?.[0] && (
                  <img
                    src={order.items[0].productId.images[0]}
                    alt={order.items[0].productId.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-md border"
                  />
                )}

                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{order.items[0]?.productId?.name}</h3>
                  <p className="text-gray-700 mt-1">💰 <span className="font-medium">Total:</span> ₹{order.totalAmount}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


