require("dotenv").config()
const User = require("../models/user-model")
const bcrypt = require("bcryptjs")
const crypto = require("crypto");
const nodemailer = require("nodemailer");


const home = async(req,res) =>{
    try {
        res.status(200).json({ message:"Hii I'm slash route"})
    } catch (error) {
        console.log(error);
        
    }
}

//Register Logic

const register = async(req,res) =>{
    try {
        const {username , email,phone,password}  = req.body
        
        const userExits = await User.findOne({email})

        if(userExits){
            return res.status(400).json({message:"Email already exist"})

        }

        // Create a verification token
        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiration = Date.now() + 3600000; // Token valid for 1 hour

        
 
        const userCreated = await User.create({
          username , 
          email,
          phone ,
          password,
          verificationToken: token,
          tokenExpiration,
          isVerified: false,
        })


        // Send email
        const transporter = nodemailer.createTransport({
            service: "Gmail", // Use a service like Gmail
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        const verificationUrl = `https://foot-world-vozs-one.vercel.app/verifyEmail?token=${token}`;

         
        const app_name = "FootWorld"
        const emailTemplate = `<!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #121212;
                margin: 0;
                padding: 0;
                color: #ffffff;
              }
        
              .email-container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #1e1e1e;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                overflow: hidden;
              }
        
              .header {
                background-color: #673ab7;
                color: #ffffff;
                text-align: center;
                padding: 30px;
                font-size: 26px;
                font-weight: bold;
              }
        
              .content {
                padding: 25px;
                line-height: 1.8;
              }
        
              .content h2 {
                color: #ff9800;
                font-size: 22px;
              }

              .content p {
                color:#ffffff;
              }


        
              .button-container {
                text-align: center;
                margin: 30px 0;
              }
        
              .verify-button {
                background-color: #ff9800;
                color: #ffffff;
                text-decoration: none;
                padding: 14px 24px;
                border-radius: 6px;
                font-size: 16px;
                font-weight: bold;
                display: inline-block;
              }
        
              .verify-button:hover {
                background-color: #ff8c00;
              }

              .footer {
                text-align: center;
                padding: 15px;
                font-size: 12px;
                color: #bbbbbb;
                background-color: #161616;
                border-top: 1px solid #333333;
              }
        
              .footer a {
                color: #03dac6;
                text-decoration: none;
              }
        
              .note {
                font-size: 14px;
                color: #aaaaaa;
              }
            </style>
          </head>
        
          <body>
            <div class="email-container">
              <div class="header">
                Welcome to ${app_name} 🎉
              </div>
              <div class="content">
                <h2>Hello ${username},</h2>
                <p>
                  Thank you for joining <strong> ${app_name}</strong>. We're thrilled to have you onboard! Please confirm your email address to unlock the full experience.
                </p>
        
                <div class="button-container">
                  <a href="{{verification_link}}" class="verify-button">
                    Verify My Email
                  </a>
                </div>
        
                <p>
                  If the button above doesn't work, copy and paste the following link into your browser:
                </p>
                <p>
                  <a href="{{verification_link}}" style="color: #03dac6;">
                    verification_link
                  </a>
                </p>
        
                <p class="note">
                  This verification link will expire in <strong>10 minutes</strong>. If you did not sign up for this account, please ignore this email.
                </p>
        
                <p>With regards,<br>${app_name} Team</p>
              </div>
        
              <div class="footer">
                <p>&copy; 2025 ${app_name}. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>`;
        

        const mailOptions = {
            from: `${app_name} <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email",
            html:emailTemplate.replace("{{verification_link}}", verificationUrl),
        }
  
        
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
      res.status(500).json({ message: "Failed to register user", error });
    }
  }

//Login logic
 
const login = async(req,res) =>{
    try {
        const {email,password} = req.body

        const userExist = await User.findOne({email})
        
        if(!userExist) {
            return res.status(400).json({message:"Invalid Credentials"})
        }

        if (!userExist.isVerified) return res.status(400).json({ message: "Please verify your email first" });
        // const user = await bcrypt.compare(password,userExist.password)
        const user = await userExist.comparePassword(password)
        
        if(user){
            res.status(200).json({
                message:"Login Succesful" ,
                token : await userExist.generateToken(),
                userId: userExist._id.toString(),
            })
        }
        else {
            res.status(401).json({message:"Invalid Email or Password"})
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

//User Logic-Send user data

const user = async(req,res)=>{
    try {
      console.log("line-236")
        const userData = req.user
        console.log(userData)
        return res.status(200).json({userData })
    } catch (error) {
        console.log(`Error from User route ${error}`);
        
    }
}

const verifyEmail = async (req,res) =>  {
    const { token } = req.query;
    console.log(token)
  
    try {
      // Find the user by token
      const user = await User.findOne({
        verificationToken: token,
        tokenExpiration: { $gt: Date.now() }, // Check token expiration
      });
  
      if (!user) return res.status(400).json({ message: "Invalid or expired token" });
  
      // Update the user to mark them as verified
      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            isVerified: true,
            verificationToken: null,
            tokenExpiration: null,
          },
        }
      );
  
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to verify email", error });
    }
  }
 

//Check Email Verification Continously

const checkEmailVerification =  async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found." });

    return res.status(200).json({ isVerified: user.isVerified });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {home , register,login , user , verifyEmail , checkEmailVerification }
 