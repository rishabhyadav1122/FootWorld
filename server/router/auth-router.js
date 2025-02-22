const express  = require("express")
const router = express.Router()
const authControllers = require("../controllers/auth-controllers")
const {signupSchema , loginSchema} = require("../validators/auth-validator")
const validate = require("../middlewares/validate-middleware")
const authMiddleware = require("../middlewares/auth-middleware")

router.route("/home").get(authControllers.home)
router.route("/register").post(validate(signupSchema),authControllers.register)
router.route("/login").post(validate(loginSchema),authControllers.login)
router.route("/user").get(authMiddleware  , authControllers.user)
router.route("/verifyEmail").get(authControllers.verifyEmail)
router.route("/checkEmailVerification").get(authControllers.checkEmailVerification)


module.exports = router