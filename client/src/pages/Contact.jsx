import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const defaultContactFormData = {
    username: "",
    email: "",
    message: ""
};

export const Contact = () => {
    const [contact, setContact] = useState(defaultContactFormData);
    const [userData, setUserData] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (userData && user) {
            setContact({
                username: user.username,
                email: user.email,
                message: "",
            });
            setUserData(false);
        }
    }, [userData, user]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://foot-world.vercel.app/api/form/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            if (response.ok) {
                setContact((prevState) => ({
                    ...prevState,
                    message: "",
                }));
                toast.success("Message sent successfully");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Message not delivered");
        }
    };

    return (
   
        <section className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6 py-10">
             <h2 className="mb-4">
  <Link 
    to="/"  
    className="font-bold text-2xl text-violet-500 border border-violet-500 rounded-lg px-4 py-2 inline-block"
  >
    Home
  </Link>
</h2>
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold">Name</label>
                        <input
                            type="text"
                            name="username"
                            value={contact.username}
                            onChange={handleInput}
                            autoComplete="off"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={contact.email}
                            onChange={handleInput}
                            autoComplete="off"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Message</label>
                        <textarea
                            name="message"
                            value={contact.message}
                            onChange={handleInput}
                            autoComplete="off"
                            required
                            rows="5"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {/* Google Maps Embed */}
            <section className="mt-10 w-full max-w-4xl">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.0321774751137!2d85.38963227498985!3d23.387053178919963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e3f73caf059b%3A0x35c1634fa356ac73!2sIIIT%20RANCHI%20(KHELGAON%20CAMPUS)!5e0!3m2!1sen!2sin!4v1737404560444!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    allowFullScreen
                    loading="lazy"
                    className="rounded-lg shadow-lg"
                ></iframe>
            </section>
        </section>
    );
};
