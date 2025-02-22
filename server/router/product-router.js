const express  = require("express")
const productController = require("../controllers/product-controller")
const router = express.Router()


router.route("/product").get(productController.products)
router.route("/product/:id").get(productController.getProductDetails)

module.exports = router