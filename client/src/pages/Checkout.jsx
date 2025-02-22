import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify"


export const Checkout = () => {
  const navigate = useNavigate();
  const { user  } = useAuth(); // Get logged-in user info
  const [addresses, setAddresses] = useState([]); // User's saved addresses
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [product, setProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId"); // Get productId from URL

  // Fetch addresses when component mounts
  useEffect(() => {
    if (!user || !user._id) return; // Ensure user is logged in

    const fetchAddresses = async () => {
      try {
        console.log(`Fetching addresses for user ID: ${user._id}`);
        const response = await fetch(`http://localhost:5000/api/address/getAddress/${user._id}`);
        const data = await response.json();
        const allAddress= data.addresses
        console.log("Fetched Address Data:", allAddress);
        if (response.ok) {
          setAddresses(allAddress);
          setSelectedAddress(allAddress.length > 0 ? allAddress[0]._id : null); // Select first address by default
        } else {
          console.error("Error fetching addresses:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    const fetchProduct = async () => {
      try {
          const response = await fetch(`http://localhost:5000/api/data/product/${productId}`);
          const data = await response.json();
          console.log(data.product.price)
          if (response.ok) {
              setProduct(data);
              setTotalPrice(data.product.price); // Default price
          } else {
              console.error("Error fetching product:", data.message);
          }
      } catch (error) {
          console.error("Failed to fetch product:", error);
      }
  };

  fetchProduct();
    // setTimeout(() => { // Small delay to ensure user data is available
  fetchAddresses();
    // }, 500);

    // Calculate expected delivery date (random between 3-4 days)
    const today = new Date();
    const deliveryDays = Math.floor(Math.random() * 2) + 3; // Random between 3-4 days
    today.setDate(today.getDate() + deliveryDays);
    setDeliveryDate(today.toDateString());
  }, [user,productId]);

  const handleConfirmOrder = async (productId) => {
    if (!user) {
      toast.error("Please login to proceed with purchase.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/order/placeOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId,
          quantity: 1, // Default to 1 for Buy Now
          paymentMethod: "COD", // For now, using Cash on Delivery (COD)
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Order placed successfully!");
        navigate("/orderConfirmation"); // Redirect to confirmation page
      } else {
        toast.error(data.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong.");
    }
  };
    

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Saved Addresses Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Select a Delivery Address</h3>
        {addresses.length > 0 ? (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <label key={addr._id} className="flex items-center gap-2 border p-3 rounded-md cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="address"
                  value={addr._id}
                  checked={selectedAddress === addr._id}
                  onChange={() => setSelectedAddress(addr._id)}
                />
                <div >
                <p className="font-semibold">{addr.fullName}</p>
                <p>{addr.colony}, {addr.city}, {addr.state} - {addr.postalCode}</p>
                <p>{addr.country}</p>
                <p className="text-gray-600">Phone: {addr.phone}</p>
            </div>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No saved addresses found.</p>
        )}

        {/* Add Address Button */}
        <button
          onClick={() => navigate("/address")}
          className="mt-3 px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          + Add New Address
        </button>
        <div className="text-lg font-semibold text-gray-800 bg-gray-100 p-2 rounded-md shadow-md">
    Total Price: <span className="text-green-600">₹{totalPrice}</span>
</div>

      </div>

      {/* Expected Delivery Date */}
      <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-md">
        <p className="font-semibold text-green-700">📦 Expected Delivery By: {deliveryDate}</p>
      </div>

      {/* Confirm Order Button */}
      <button
        onClick={()=>handleConfirmOrder(productId)}
        className="mt-6 w-full px-4 py-2 cursor-pointer bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
      >
        Confirm Order
      </button>
    </div>
  );
};


