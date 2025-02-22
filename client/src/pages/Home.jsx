import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaShoppingCart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/outline"; // You can install heroicons for icons



export const Home = () => {
    const { isLoggedIn , user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://get.pxhere.com/photo/converse-shoes-natural-landscape-nature-green-grass-walkway-tree-natural-environment-footwear-wood-boardwalk-grass-family-lawn-plant-spring-landscape-architecture-photography-path-forest-shoe-landscaping-stock-photography-park-woodland-nonbuilding-structure-leisure-bridge-garden-furniture-sculpture-trunk-state-park-grassland-1606189.jpg",
    "https://thumbs.dreamstime.com/b/pair-white-winter-boots-snowy-landscape-stylish-footwear-cold-weather-pair-white-winter-boots-snowy-landscape-337635888.jpg",
    "https://plus.unsplash.com/premium_photo-1663100769321-9eb8fe5a8e6b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    "https://media.istockphoto.com/id/1134757670/photo/female-hands-put-sneakers-collection-on-store-rack.jpg?s=612x612&w=0&k=20&c=YM23XrdMP-EDSR4CeiAO831QtVlkEk3zOCRTDfI8_vw=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWRb7T8-736ZEBD0qaWmlwyPYaWbcy3IvzMQ&s",
    "https://images4.alphacoders.com/991/991768.jpg",
    "https://images-cdn.ubuy.co.in/659f09d8e7a0384c044b1f65-black-leather-tourism-shoes-leisure.jpg",



  ];

 



  // useEffect(() => {
  //   setCart(); // Fetch updated cart whenever cart length changes
  // }, [cart.length]); 

  const navigate = useNavigate();
const handleSearchClick = () => {
  navigate("/product"); // Redirect to Products Page
};

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  
  return (
    
    <div className="relative min-h-screen">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-white shadow-md p-4 fixed w-full top-0 z-10">
      {/* Left Section: Sidebar & Logo */}
      <div className="flex items-center gap-4">
        <button className="text-gray-700 hover:text-gray-900" onMouseEnter={() => setShowSidebar(true)}>
          <FaBars size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">FootWorld</h1>
      </div>

      {/* Search Bar */}
      <input 
        type="text" 
        className="border rounded-md p-2 w-1/3" 
        onClick={handleSearchClick} 
        readOnly 
        placeholder="Search for products..." 
      />

      {/* Right Section: User Actions */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Cart Button (Only Visible When Logged In) */}
            <Link to="/cart" className="relative">
              <FaShoppingCart size={26} className="text-gray-700 hover:text-gray-900" />
            </Link>

            {/* Profile Icon */}
            <Link to="/profile">
              <FaUserCircle size={30} className="text-gray-700 hover:text-gray-900" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Signup</Link>
          </>
        )}
      </div>
    </header>

      {/* Sidebar Navigation */}
      <nav className={`fixed left-0 top-0 h-full bg-white shadow-md w-64 p-6 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`} onMouseLeave={() => setShowSidebar(false)}>
        <button className="absolute  top-4 right-4 text-gray-700 hover:text-gray-900 " onClick={() => setShowSidebar(false)}>
          <IoMdClose size={24} />
        </button>
        <ul className="mt-20 text-2xl space-y-4">
          <li><Link to="/" className="block text-gray-700 hover:text-blue-500">Home</Link></li>
          <li><Link to="/product" className="block text-gray-700 hover:text-blue-500">Products</Link></li>
          <li><Link to="/orderList" className="block text-gray-700 hover:text-blue-500">Orders</Link></li>
          <li><Link to="/cart" className="block text-gray-700 hover:text-blue-500">Cart</Link></li>
          <li><Link to="/contact" className="block text-gray-700 hover:text-blue-500">Contact Us</Link></li>
          <li><Link to="/address" className="block text-gray-700 hover:text-blue-500">Saved Addresses</Link></li>
          <li><Link to="/logout" className="block text-red-500 hover:text-red-700">Logout</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="pt-20 p-4 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Discover the Best Shoe Styles</h2>
        <p className="text-gray-600 max-w-xl text-xl text-center">
          Explore our latest collection of sneakers, formal shoes, and casual footwear. Find the perfect pair that fits your style and comfort.
        </p>
        
        {/* Image Slider */}
        <div className="relative w-full max-w-3xl overflow-hidden my-6">
          <img src={images[currentSlide]} alt="Shoe Style" className="w-full rounded-lg transition-opacity duration-1000 " />
        </div>
        
        {/* Customer Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Review 1 */}
        <div className="bg-gray-100 p-6 w-full max-w-3xl rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Happy Customers</h3>
            <p className="text-gray-600 italic">"FootWorld provides the best shoes at great prices. Super comfortable and stylish!"</p>
            <p className="text-gray-700 font-semibold mt-2">- Rahul S.</p>
        </div>

        {/* Review 2 */}
        <div className="bg-gray-100 p-6 w-full max-w-3xl rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Happy Customers</h3>
            <p className="text-gray-600 italic">"I love the variety of shoes available at FootWorld. The quality is amazing, and they last for years!"</p>
            <p className="text-gray-700 font-semibold mt-2">- Priya M.</p>
        </div>

        {/* Review 3 */}
        <div className="bg-gray-100 p-6 w-full max-w-3xl rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Happy Customers</h3>
            <p className="text-gray-600 italic">"FootWorld has the best customer service. They helped me find the perfect pair for my needs!"</p>
            <p className="text-gray-700 font-semibold mt-2">- Ankit R.</p>
        </div>

        {/* Review 4 */}
        <div className="bg-gray-100 p-6 w-full max-w-3xl rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Happy Customers</h3>
            <p className="text-gray-600 italic">"The shoes I bought from FootWorld are not only stylish but also incredibly comfortable. Highly recommended!"</p>
            <p className="text-gray-700 font-semibold mt-2">- Neha K.</p>
        </div>
        </div>
      </main>


    </div>
  );
};


