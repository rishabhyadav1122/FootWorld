const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Assuming you have user authentication
    items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);