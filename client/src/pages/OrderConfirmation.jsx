import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

export const OrderConfirmation = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const {user} = useAuth()
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Stop confetti after 5 seconds

    return () => clearTimeout(timer);
  }, []);

 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Firecracker Effect */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-500 rounded-full shadow-lg"
        animate={{ scale: [1, 1.5, 2, 0], opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1.5, repeat: 3 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-red-500 rounded-full shadow-lg"
        animate={{ scale: [1, 1.5, 2, 0], opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1.5, repeat: 3 }}
      />

      {/* Animated Order Success Message */}
      <motion.h1
        className="text-3xl font-bold text-white mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        🎉 Order Placed Successfully! 🎉
      </motion.h1>

      <motion.p
        className="text-xl text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Thank you {user.username} for shopping with us! 🚀
      </motion.p>

      {/* Continue Shopping Button with Hover Effect */}
      <motion.div >
  <Link
    to="/product"
    className="px-6 py-3 bg-white text-blue-600 font-bold rounded-md shadow-md hover:bg-gray-200 transition block"
  >
    Continue Shopping 🛒
  </Link>
</motion.div>
    </div> 
  );
};


