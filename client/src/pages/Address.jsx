import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Address = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/api/address/getAddress/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data.addresses || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching addresses:", error);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto p-4">
<h2 className="mt-7">
  <Link 
    to="/"  
    className="font-bold text-2xl text-violet-500 border border-violet-500 rounded-lg px-4 py-2 inline-block"
  >
    Home
  </Link>
</h2>
      
      <h2 className="text-2xl font-bold mb-4">Your Saved Addresses</h2>

      {loading ? (
        <p>Loading...</p>
      ) : addresses.length > 0 ? (
        <div className="grid gap-4">
          {addresses.map((addr, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <p className="font-semibold">{addr.fullName}</p>
              <p>{addr.colony}, {addr.city}, {addr.state} - {addr.postalCode}</p>
              <p>{addr.country}</p>
              <p className="text-gray-600">Phone: {addr.phone}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved addresses found.</p>
      )}

      <Link to="/addAddress">
        <button className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded mt-4">
          Add New Address
        </button>
      </Link>
    </div>
  );
};


