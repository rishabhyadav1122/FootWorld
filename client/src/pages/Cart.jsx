import React, { useEffect } from "react";
import { useCart } from "../store/CartContext";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cart, setCart } = useCart();
  const { user } = useAuth();

  // Fetch cart whenever the user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const response = await fetch(`https://foot-world.vercel.app/api/cart/getCart/${user._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          setCart(data.items || []);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };

    fetchCart();
  }, [user]);

  const totalPrice = cart.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  return (
    <div className="p-6">
      <h2 className="mt-1">
  <Link 
    to="/"  
    className="font-bold text-2xl text-violet-500 border border-violet-500 rounded-lg px-4 py-2 inline-block"
  >
    Home
  </Link>
</h2>
      
    <h2 className="text-2xl font-bold">Shopping Cart</h2>

    {cart.length > 0 ? (
      <>
        {/* Display Total Price */}
        <div className="text-xl font-semibold mt-4 mb-4">
          Total Price: ₹{totalPrice.toFixed(2)}
        </div>

        {/* Grid Layout for Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div key={item.productId._id} className="border p-4 rounded shadow-lg bg-white">
              <img
                src={item.productId.images} // Ensure this field exists in your database
                alt={item.productId.name}
                className="w-full h-40 object-cover rounded"
              />
              <p className="font-semibold mt-2">{item.productId.name}</p>
              <p className="text-gray-600">Price: ₹{item.productId.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      </>
    ) : (
      <p className="text-gray-500 mt-4">Your cart is empty.</p>
    )}

    <div className="mt-6">
      <Link to="/checkout">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  </div>
);
  
};

