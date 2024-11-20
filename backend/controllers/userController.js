import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const nodemailer = require('nodemailer');

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}



// Configure the transporter with your email service
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // SMTP host (e.g., for Office 365 or Exchange)
  port: 587, // SMTP port
  secure: false, // Use TLS
  auth: {
    user: process.env.MAIL_NAME, // Your email
    pass: process.env.MAIL_PASS, // Your password or app password
  },
});

// Function to send the registration email
const sendRegistrationEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_NAME, // Sender address
      to: userEmail, // Recipient's email
      subject: 'Welcome to Our Website!',
      html: `<h1>Hello, ${userName}!</h1>
             <p>Thank you for registering on our website. We are excited to have you on board.</p>
             <p>Enjoy exploring our platform!</p>
             <p>Best Regards,<br>The Team</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



export const registerUser = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const exists = await userModel.findOne({email})
        // console.log(exists.email)

        // Checking, is user already exists
        if (exists) {
            return res.json({success: false, email: `*${exists.email}*`, message: ` email already exists`})
        }

        if (email.endsWith("@gmail.com") || email.endsWith("@visionsoft.com")){

            if (password.length < 8) {
                return res.json({success: false, message: "*Enter a strong Password*"})
            }
            //hashing the password

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)



            const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPassword
            })

            const user = await newUser.save()
            const token = createToken(user._id)

            // Send registration email
            await sendRegistrationEmail(email, name);
            // const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" })
            // res.cookie("token", token)
            res.json({success: true, token, name})
        } else {
            return res.json({success: false, message: "Enter Valid mail which ends with @gmail.com (or) @visionsoft.com"})

        }
    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})

        // Checking user registered or not
        if (!user) {
            return res.json({success: false, message: "*User doesn't exist*"})
        }

        // Comparing the password
        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.json({success: false, message: "*Password is Incorrect*"})
        }

        const token = createToken(user._id)
        // const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" })
        // res.cookie("token", token)
        res.json({success: true, token, name: `${user.name}`, message: "Login Successful"})
    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: "*Error*"})
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token")
    return res.json("Logout Successful!")
}
