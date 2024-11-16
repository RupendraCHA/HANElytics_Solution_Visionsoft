import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

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
