const express  = require("express")
const router = express.Router()
const addressController = require("../controllers/address-controller")

router.route("/getAddress/:userId").get(addressController.getAddress)
router.route("/addAddress/:userId").post(addressController.addAddress)

module.exports = router