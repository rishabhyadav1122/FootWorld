require("dotenv").config()
const Order = require("../models/order-model");
const Product = require("../models/product-model");
const User = require("../models/user-model");
const nodemailer = require("nodemailer");



const getAllOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const orders = await Order.find({ userId }).populate("items.productId");

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// const placeOrder = async (req, res) => {
//     try {
//         const { userId, productId, quantity, paymentMethod } = req.body;

//         if (!userId || !productId || !quantity || !paymentMethod) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         const totalAmount = product.price * quantity;

//         const newOrder = await Order.create({
//             userId,
//             items: [{ productId, quantity }],
//             totalAmount,
//             paymentMethod,
//             paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed", // Example logic
//         });

//         res.status(201).json({ message: "Order placed successfully", order: newOrder });

//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// Send Email Function
const sendEmail = async (to, subject, html) => {  // FIX: Changed `text` to `html`
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html, // FIX: Corrected parameter usage
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
  // Place Order Function
  const placeOrder = async (req, res) => {
    try {
      const { userId, productId, quantity, paymentMethod } = req.body;
  
      if (!userId || !productId || !quantity || !paymentMethod) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Fetch product details
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Fetch user details to get email
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const totalAmount = product.price * quantity;
  
      // Create order
      const newOrder = await Order.create({
        userId,
        items: [{ productId, quantity }],
        totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed",
      });
  
      // Email Content
      const emailSubject = "Order Confirmation - Your Order is Placed!";
      const emailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
          <div style="text-align: center; padding-bottom: 10px;">
            <h2 style="color: #27ae60;">Order Confirmation</h2>
            <p style="color: #555;">Thank you for shopping with us, <strong>${user.username}</strong>!</p>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0px 2px 5px rgba(0,0,0,0.1);">
            <h3 style="color: #333;">Order Summary</h3>
            <p><strong>Product:</strong> ${product.name} (x${quantity})</p>
            <p><strong>Total Amount:</strong> <span style="color: #27ae60;">₹${totalAmount}</span></p>
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
          </div>
  
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #666;">Your order is being processed and will be shipped soon.</p>
            <p style="font-size: 14px; color: #999;">If you have any questions, feel free to contact our support team.</p>
            <a href="https://your-ecommerce-site.com/orders" 
               style="display: inline-block; padding: 10px 20px; background-color: #27ae60; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">
               View Your Order
            </a>
          </div>
  
          <div style="text-align: center; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
            <p style="color: #888; font-size: 12px;">© 2025 Your Company. All rights reserved.</p>
          </div>
        </div>
      `;
  
      await sendEmail(user.email, emailSubject, emailHTML);  // FIX: Correct parameter order
  
      res.status(201).json({ message: "Order placed successfully", order: newOrder });
  
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

module.exports = { placeOrder , getAllOrders };