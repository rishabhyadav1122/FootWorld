const Cart = require('../models/cart-model');
const Product = require('../models/product-model');

const getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const addToCart = async (req, res) => {
    // const { userId } = req.params
    const {userId ,  productId, quantity } = req.body

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
       
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create a new cart if not found
            cart = await Cart.create({ userId, items: [] });
        }

         // Check if the product is already in the cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // Update quantity if product already exists in the cart
            await Cart.findOneAndUpdate(
                { userId, "items.productId": productId },
                { $inc: { "items.$.quantity": quantity } },
                { new: true }
            );
        } else {
            // Add new product to the cart
            await Cart.findOneAndUpdate(
                { userId },
                { $push: { items: { productId, quantity } } },
                { new: true }
            );
        }

        const updatedCart = await Cart.findOne({ userId }).populate('items.productId');
        res.status(200).json({ message: 'Product added to cart', cart: updatedCart });

        



    }catch(error){
        res.status(500).json({ message: 'add to cart error:', error });
    }
}

module.exports = { getCart, addToCart }