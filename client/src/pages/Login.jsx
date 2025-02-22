import { useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth"
import { toast } from "react-toastify"


export const Login = () => {
    const [user,setUser] = useState({
        email:"",
        password:"",
    })

    const navigate = useNavigate()
    const { storeTokenInLS } = useAuth()


    const handleInput = (e) =>{
        console.log(e)
        let name = e.target.name
        let value = e.target.value

        setUser({
            ...user,
            [name]:value,
        })
    }


    const URL = "http://localhost:5000/api/auth/login" 

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify(user)
            })

            console.log("login-",response)
            const res_data = await response.json()

            if(response.ok){
                
                storeTokenInLS(res_data.token)
                setUser(
                    {
                        email:"",
                        password:"",
                    }
                )
                toast.success("Login Successful")
                navigate("/")

            }else{

                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message) 
                console.log("Invalid Credentials")}
                } catch (error) {
            console.log(error)
        }

    }
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleInput}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleInput}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
};


