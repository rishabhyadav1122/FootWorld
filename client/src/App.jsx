import {BrowserRouter , Routes , Route, Navigate , useLocation} from "react-router-dom"
import { AnimatePresence, motion } from 'framer-motion';
import {Home} from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Contact } from "./pages/Contact"
import { Error } from "./pages/Error"
import { Logout } from "./pages/Logout"
import { toast } from "react-toastify"
import { VerifyEmail } from "./pages/VerifyEmail"
import { Profile } from "./pages/Profile"
import { Product } from "./pages/Product";
import {Address} from "./pages/Address";
import { AddAddress } from "./pages/AddAddress";
import { Footer } from "./components/Footer";
import { ProductPage } from "./pages/ProductPage";
import {Cart} from "./pages/Cart";
import  {OrderConfirmation}  from "./pages/OrderConfirmation";
import {Checkout} from "./pages/CheckOut";
import {Orders} from "./pages/Order";



const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token"); // Replace with your auth logic
  if (!isLoggedIn) {
    toast.error("Please login or register first.");
    return <Navigate to="/login" replace />;
  }
  return children;
};

// const App = () => {
//   return ( 
//   <>
//    <BrowserRouter>
//     <Navbar />
//     <Routes>
//       <Route path="/" element={<Home/>} />
//       <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
//       <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
//       <Route path="/service" element={<PrivateRoute><Service /></PrivateRoute>} />
//       <Route path="/register" element={<Register/>} />
//       <Route path="/login" element={<Login/>} />
//       <Route path="/logout" element={<Logout/>} />
//       <Route path="/profile" element={<Profile/>} />
//       <Route path="/verifyEmail" element={<VerifyEmail/>} />
//       <Route path="/services/web-development" element={<PrivateRoute><WebDevelopment /></PrivateRoute>} />
//       <Route path="/services/ui-ux-design" element={<PrivateRoute><UIUXDesign /></PrivateRoute>} />
//       <Route path="/services/wordpress-development" element={<PrivateRoute><WordPressDevelopment /></PrivateRoute>} />
//       <Route path="/services/mobile-app-development" element={<PrivateRoute><MobileAppDevelopment /></PrivateRoute>} />
//       <Route path="/services/responsive-web-design" element={<PrivateRoute><ResponsiveWebDesign /></PrivateRoute>} />
//       <Route path="/services/ecommerce-development" element={<PrivateRoute><ECommerceDevelopment /></PrivateRoute>} />
//       <Route path="*" element={<PrivateRoute><Error /></PrivateRoute>} />
//     </Routes>
//     <Footer/>
//    </BrowserRouter>
//   </>
//   )
// }
// export default App;


const AnimatedRoutes = () => {
  const location = useLocation();

  // Animation container component
  const pageTransition = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.4 },
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {[
          { path: "/", element: <Home /> },
          { path: "/contact", element: <Contact />, private: true },
          { path: "/product", element: <Product />, private: true },
          { path: "/product/:id", element: <ProductPage />, private: true },
          { path: "/register", element: <Register /> },
          { path: "/login", element: <Login /> },
          { path: "/logout", element: <Logout /> },
          { path: "/profile", element: <Profile /> ,  private: true },
          { path: "/verifyEmail", element: <VerifyEmail /> },  
          { path: "/address", element: <Address /> , private: true},  
          { path: "/orderList", element: <Orders /> , private: true},  
          { path: "/addAddress", element: <AddAddress /> , private: true},  
          { path: "/cart", element: <Cart /> , private: true},  
          { path: "/orderConfirmation", element: <OrderConfirmation /> , private: true},  
          { path: "/checkout", element: <Checkout /> , private: true},  
          { path: "*", element: <Error />, private: true },
        ].map(({ path, element, private: isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div {...pageTransition}>
                {isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element}
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <>
    
      <BrowserRouter >
        <AnimatedRoutes  />
        <Footer/>
      </BrowserRouter>
      
    </>
  );
};


export default App;