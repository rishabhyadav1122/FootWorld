require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const authRoute = require("../router/auth-router")
const contactRoute = require("../router/contact-router")
const productRoute = require("../router/product-router")
const addressRoute = require("../router/address-router")
const cartRoute = require("../router/cart-router")
const orderRoute = require("../router/order-router")
const connectDb = require("../utils/db")
const errorMiddleware = require("../middlewares/error-middleware")
const PORT = 5000; 

// let's Handle Cors Policy issue
// const corsOptions = {
//     origin:"https://localhost:5173",
//     methods:"GET, POST , PUT , DELETE , PATCH , HEAD",
//     credentials:true,
// }


app.use(cors())


app.use(express.json())


app.use("/api/auth", authRoute)
app.use("/api/form", contactRoute)
app.use("/api/data", productRoute)
app.use("/api/address", addressRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute);


app.use(errorMiddleware)
 
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`);
        
    })
})