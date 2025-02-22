const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt  = require("jsonwebtoken")
const dotenv = require("dotenv").config()

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        require:true,
    },
    email : {
        type:String,
        require:true,
    },
    phone : {
        type:Number,
        require:true,
    },
    password : {
        type:String,
        require:true,
    },

    
    isVerified: { type: Boolean, default: false }, // New field
    verificationToken: String, // Token for email verification
    tokenExpiration: Date, // Expiration time for the token
    
})

userSchema.pre("save", async function(next){
const user = this;
if(!user.isModified("password")){
    next()
}
try {
    // Hash The Password
    const saltRound = await bcrypt.genSalt(10)
    const hash_password =  await bcrypt.hash(user.password,saltRound)
    user.password = hash_password
        
} catch (error) {
  console.log(error);
    
}
})
 

//Compare the password
userSchema.methods.comparePassword  = async function (password) {
    return bcrypt.compare(password , this.password)
}

//Json Web Token
userSchema.methods.generateToken =async function () {
   try {
    return jwt.sign({
        userId: this._id.toString(),
        email:this.email,
        isAdmin:this.isAdmin,
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:"30d"
    }
)
   } catch (error) {
    console.error(error);
    
   }
}


const User = new mongoose.model("User",userSchema)

module.exports = User