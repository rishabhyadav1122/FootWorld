const express = require("express");
const router = express.Router();
const  orderController  = require("../controllers/order-controller");



router.route("/placeOrder").post(orderController.placeOrder)
router.route("/getAllOrder/:userId").get(orderController.getAllOrders)

module.exports = router;
