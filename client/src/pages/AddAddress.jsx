import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export  const AddAddress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    colony: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    console.log(e)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast("Please log in to add an address");

    try {
      const response = await fetch(`http://localhost:5000/api/address/addAddress/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        
      });
      console.log(response)

      if (response.ok) {
        toast.success("Address added successfully");
        navigate("/address");
      } else {
        toast.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Address</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" name="fullName" placeholder="Full Name" required className="border p-2 rounded" onChange={handleChange} />
        <input type="text" name="colony" placeholder="Colony" required className="border p-2 rounded" onChange={handleChange} />
        <input type="text" name="city" placeholder="City" required className="border p-2 rounded" onChange={handleChange} />
        <input type="text" name="state" placeholder="State" required className="border p-2 rounded" onChange={handleChange} />
        <input type="text" name="postalCode" placeholder="Postal Code" required className="border p-2 rounded" onChange={handleChange} />
        <input type="text" name="country" placeholder="Country" required className="border p-2 rounded" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" required className="border p-2 rounded" onChange={handleChange} />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Address
        </button>
      </form>
    </div>
  );
};


