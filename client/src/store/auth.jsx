import { createContext ,useContext, useEffect, useState} from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [token,setToken] = useState(localStorage.getItem("token"))
    const [user , setUser] = useState({})
    const [products , setProducts] = useState([])

    const storeTokenInLS = (serverToken) =>{
        setToken(serverToken)
        return localStorage.setItem("token",serverToken)

    }

    let isLoggedIn = !!token
    console.log("isLoggedIn" , isLoggedIn)

    // tackling logout functionality
    const LogoutUser =() =>{
        setToken("")
        return localStorage.removeItem("token")
    }

    // JWT Authentication-to get current login data
    const userAuthentication = async() =>{
        try {
            const response = await fetch("https://foot-world.vercel.app/api/auth/user",
                {
                    
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`   
                    }
                }

            )

            if(response.ok)
            {
                const data = await response.json()
                console.log("user data ", data.userData)
                setUser(data.userData)
                
            }

        } catch (error) {
            console.error("Error fetching user data",error)
        }
    }

    //to fetch all Products  data from backend
    const getProducts = async()=>{
        try {
            const response = await fetch("https://foot-world.vercel.app/api/data/product" , {
                method:"GET",
            })

            if(response.ok)
            {
                const data = await response.json()
                setProducts(data.msg)
            }
        } catch (error) {
            console.log(`Products ${error}`)
        }
    }

    useEffect(()=>{
        userAuthentication()
        getProducts()
    },[token])

    return <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser , user  , products}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () =>{
    const authContextValue = useContext(AuthContext)
    if(!authContextValue){
        throw new Error("useAuth used outside of the provider")

    }
    return authContextValue
}

