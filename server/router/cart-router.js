const express  = require("express")
const router = express.Router()
const cartController = require("../controllers/cart-controller")    // Importing the cart controller

router.route("/getCart/:userId").get(cartController.getCart)    // Get the cart of a user
router.route("/addToCart").post(cartController.addToCart)    // Add a product to the cart

module.exports = router