import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth"; // Import auth context
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // Get user from auth context
  const [cart, setCart] = useState([]);

  // Fetch cart only when user is available
  useEffect(() => {
    if (user) {
      fetchCart(user._id);
    }
  }, [user]);

  // Function to fetch user's cart
  const fetchCart = async (userId) => {
    try {
      const response = await fetch(`https://foot-world.vercel.app/api/cart/getCart/${userId}`)

      const data = await response.json();
      setCart(data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Function to add a product to the user's cart
  const addToCart = async (productId) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await fetch("https://foot-world.vercel.app/api/cart/addToCart", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, productId }), // Sending userId and productId
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setCart(data.items); // Update cart state for the logged-in user
        // fetchCart(user._id)
        toast.success("Product added to cart ")
      } else {
        console.error(data.message);
      }
    } catch (error) {
      toast.error("Error" , error)
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
