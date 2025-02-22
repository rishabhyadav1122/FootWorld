import { useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth"
import { toast } from "react-toastify"

export const Register = () => {

    const [user , setUser] = useState(
        {
            username:"",
            email:"",
            phone:"",
            password:"",
        }
    )
  
  
    const URL = "https://foot-world.vercel.app/api/auth/register"


  
    const navigate = useNavigate()
    const {storeTokenInLS} = useAuth()
  
    const handleInput = (e) =>{
        console.log(e)
        let name = e.target.name
        let value = e.target.value
  
        setUser({
            ...user ,
            [name] :value,
        })
    }
  
    //Handling form submit
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
    
        const res_data = await response.json();
        console.log("res from server:", res_data);
    
        if (response.ok) {
          // Registration is successful but requires email verification
          setUser({
            username: "",
            email: "",
            phone: "",
            password: "",
          });
    
          toast.success("Registration successful. Please verify your email.");
          navigate(`/verifyEmail?email=${user.email}`); // Redirect to a verification instruction page if necessary
        } else {
          toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
      } catch (error) {
        console.log("register", error);
        toast.error("Something went wrong. Please try again later.");
      }
    };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input name="username" type="text" className="w-full p-2 border rounded" autoComplete="off" placeholder="Enter your Name" value={user.username}  onChange={handleInput} required />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input name="email" type="email" className="w-full p-2 border rounded" autoComplete="off" placeholder="Enter your email" value={user.email}  onChange={handleInput} required />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input name="phone" type="tel" className="w-full p-2 border rounded" autoComplete="off" placeholder="Enter your phone number" value={user.phone} onChange={handleInput} required />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input name="password" type="password" className="w-full p-2 border rounded" autoComplete="off" placeholder="Enter your password" value={user.password} onChange={handleInput} required />
          </div>
        
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Register
          </button>
        </form>
        
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

