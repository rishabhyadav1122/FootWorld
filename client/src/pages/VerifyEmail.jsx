import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (token) {
      verifyEmailToken(token);
    }
  }, [token]);

  const verifyEmailToken = async (token) => {
    try {
      const response = await fetch(
        `https://foot-world.vercel.app/verifyEmail?token=${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Verification failed");
      }

      const data = await response.json();
      if (data.message === "Email verified successfully") {
        toast.success("Email successfully verified! Redirecting to home page...");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      toast.error(error.message);
      navigate("/register");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
  <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Verify Your Email</h1>
  <p className="text-gray-600 mb-6">
    We've sent a verification link to your email address. Please check your inbox (and spam folder, just in case) to complete the verification process.
  </p>
  <p className="text-gray-600 mb-6">
    Once verified, you'll be able to log in and access all the features of our platform.
  </p>
  {/* <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
    Resend Verification Email
  </button>
  <p className="text-gray-500 text-sm mt-4">
    Didn't receive the email? Click above to resend.
  </p> */}
</div>
  );
};

