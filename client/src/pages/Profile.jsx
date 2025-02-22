import React from "react";
import { useAuth } from "../store/auth";
import { FaUserCircle, FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Profile=() =>{
    const { user } = useAuth(); // Assume `user` contains user details
    return (
        <>
            
           <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <div className="relative inline-block">
          
          <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
            <FaUserEdit size={18} />
          </button>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">{user.username}</h2>
        <h3 className="text-gray-600 ">Email :  {user.email}</h3>
        <h3 className="text-gray-600 ">Phone : {user.phone}</h3>
        <h2 className="mt-7">
  <Link 
    to="/"  
    className="font-bold text-2xl text-violet-500 border border-violet-500 rounded-lg px-4 py-2 inline-block"
  >
    Home
  </Link>
</h2>

      </div>
    </div>
        </>
    )
}
