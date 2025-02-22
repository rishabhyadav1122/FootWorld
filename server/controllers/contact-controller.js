const Contact = require("../models/contact-model");
const nodemailer = require("nodemailer");

const contactForm = async (req, res) => {
  try {
    const response = req.body;

    // Save the contact message to the database
    await Contact.create(response);

    
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can also use other email services
      auth: {
        user: process.env.EMAIL_USER, // Your email address (store in .env)
        pass: process.env.EMAIL_PASS  // Your email password (store in .env)
      }
    });

    const email_feedback_template = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Preview</title>
      <style>
        /* Reset some default styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
    
        body {
          font-family: 'Arial', sans-serif;
          background-color: #121212;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }
    
        .email-content {
          background-color: #1f1f1f;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
          max-width: 600px;
          width: 100%;
        }
    
        h2 {
          color: rgb(41, 0, 248);
          text-align: center;
          margin-bottom: 20px;
        }
    
        .info-block {
          background-color: #2c2c2c;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
        }
    
        .info-block p {
          color: #bbbbbb;
          margin: 5px 0;
          word-break: break-word;
        }
    
        .info-label {
          color:rgb(41, 0, 248);
          font-weight: bold;
        }
      </style>
    </head>
    
    <body>
      <div class="email-content">
        <h2>New Message Received</h2>
        <div class="info-block">
          <p><span class="info-label">Name:</span> ${response.username}</p>
        </div>
        <div class="info-block">
          <p><span class="info-label">Email:</span> ${response.email}</p>
        </div>
        <div class="info-block">
          <p><span class="info-label">Message:</span></p>
          <p>${response.message}</p>
        </div>
      </div>
    </body>
    
    </html>` 
    
    const mailOptions = {
      from: response.email, // Sender email
      to: process.env.EMAIL_USER, // Receiver email (your email)
      subject: "New Contact Form Submission",
      html : email_feedback_template,
    };
 
    
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Message not delivered: " , error });
  }
};

module.exports = contactForm;
