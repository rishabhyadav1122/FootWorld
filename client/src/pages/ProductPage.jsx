import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../store/CartContext";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify"

export const ProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const { addToCart } = useCart(); // Get addToCart function
  const [product, setProduct] = useState({})
  const {user} = useAuth()
  const navigate = useNavigate()

  const handleBuyNow = () => {
    navigate(`/checkout?productId=${id}`);
  }
  

  const fakeReviews = [
    {
      username: "Amita Verma",
      comment: "Amazing quality! The shoes are super comfortable and stylish.",
      rating: 5,
    },
    {
      username: "Khushi Sharma",
      comment: "Great product! Fits perfectly and the material feels premium.",
      rating: 4,
    },
    {
      username: "Rahul Kapoor",
      comment: "Good value for money. Delivery was fast, and the packaging was great.",
      rating: 4.5,
    },
    {
      username: "Sneha Patel",
      comment: "The color is slightly different from the picture, but still a great buy!",
      rating: 3.5,
    },
    {
      username: "Vikram Singh",
      comment: "Absolutely love these shoes! I get compliments all the time.",
      rating: 5,
    },
    {
      username: "Neha Gupta",
      comment: "Comfortable for daily wear. Would definitely recommend!",
      rating: 4.2,
    },
  ];


  

  useEffect(() => {
    // Fetch product details using API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/data/product/${id}`);
        const data = await response.json();
        console.log(data, "Hello")
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
        fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }


  

  return (
    <div className="container mx-auto p-6">
        <h2 className="mb-4">
  <Link 
    to="/"  
    className="font-bold text-2xl text-violet-500 border border-violet-500 rounded-lg px-4 py-2 inline-block"
  >
    Home
  </Link>
</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div>
          <img src={product.images} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow" />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.brand}</p>
          <p className="text-gray-900 font-bold text-2xl mt-4">₹{product.price}</p>

          {/* Available Sizes */}
          {product.sizes && product.sizes.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Available Sizes:</h3>
              <div className="flex space-x-2 mt-2">
                {product.sizes.map((size, index) => (
                  <span key={index} className="border p-2 rounded">{size}</span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No sizes available.</p>
          )}

          {/* Stock Info */}
          <p className={`mt-4 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <button onClick={() => handleBuyNow()} className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700">
              Buy Now
            </button>
            <button  onClick={() => addToCart(product._id)} className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

   {/* Product Description */}
    <div className="mt-8 p-6 border rounded-lg shadow bg-white">
        <h2 className="text-2xl font-semibold mb-3">Product Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {product.description ? product.description : "No description available for this product."}
          </p>
    </div>


      {/* Product Reviews */}
      <div className="mt-10">
  <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
  <div className="grid grid-cols-2 gap-6"> 
    {(product.reviews && product.reviews.length > 0 ? product.reviews : fakeReviews).map((review, index) => (
      <div key={index} className="border p-4 rounded shadow">
        <p className="font-semibold">{review.username}</p>
        <p className="text-gray-600">{review.comment}</p>
        <p className="text-yellow-500">Rating: {review.rating} ⭐</p>
      </div>
    ))}
  </div>
</div>;
    </div>
  );
};

