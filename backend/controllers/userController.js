import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { SendVerificationCode, WelcomeEmail } from "../middlewares/greetMails.js"
import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import nodemailer from "nodemailer"

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

// export const registerUser = async (req, res) => {
//     const {firstname, lastname, businessName,
//         contact, email, password, city, street,
//         state, country, zipcode, role, position,
//         countryPhoneCode,countryCode
//     } = req.body

//     try {
//         const exists = await userModel.findOne({email})
//         // console.log(exists.email)

//         // Checking, is user already exists

//             const rawNumber = `${countryPhoneCode}${contact.replace(/[^0-9]/g, '')}`;

//             const phoneNumber = parsePhoneNumberFromString(rawNumber);

//             // Validate number existence, format, and match with expected country
//             if (
//                 !phoneNumber ||
//                 !phoneNumber.isValid() ||
//                 (countryCode && phoneNumber.country !== countryCode.toUpperCase())
//             ) {
//                 return res.json({
//                 success: false,
//                 message: `Invalid phone number for ${countryCode || 'selected country'}`,
//                 });
//             }

//             // ✅ If everything is valid, return success
//             // if (phoneNumber.isValid() && (phoneNumber.country === countryCode)) {
//             //     return res.json({
//             //     success: false,
//             //     message: 'Valid phone number',
//             //     formatted: phoneNumber.formatInternational(),
//             //     nationalFormat: phoneNumber.formatNational(),
//             //     country: phoneNumber.country,
//             //     });
//             // }


//         if (exists) {
//             return res.json({success: false, email: `*${exists.email}*`, message: ` email already exists`})
//         }

//         if (email.includes("@") && phoneNumber.isValid() && (phoneNumber.country === countryCode)){

//             if (password.length < 8) {
//                 return res.json({success: false, message: "*Enter a strong Password*"})
//             }

//             const salt = await bcrypt.genSalt(10)
//             const hashedPassword = await bcrypt.hash(password, salt)
//             const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

//             const newUser = new userModel({
//                 firstname: firstname,
//                 lastname: lastname || "",
//                 email: email,
//                 password: hashedPassword,
//                 businessName: businessName,
//                 contact: contact,
//                 countryPhoneCode: countryPhoneCode,
//                 countryCode: countryCode,
//                 role: role,
//                 position: position,
//                 city: city,
//                 street: street,
//                 state: state,
//                 country: country,
//                 zipcode: zipcode,
//                 verificationCode: verificationCode
//             })

//             const user = await newUser.save()
//             const token = createToken(user._id)
//             SendVerificationCode(newUser.email, verificationCode, newUser.firstname, newUser.lastname)
//             res.json({success: true, token, firstname: `${firstname} ${lastname}`, verificationCode, role, email: email})
//         } else {
//             return res.json({success: false, message: "Enter Valid email"})
//         }
//     }
//     catch (error) {
//         console.log(error)
//         res.json({success: false, message: `${error.message}`})
//     }
// }

export const registerUser = async (req, res) => {
    const {firstname, lastname, businessName,
        contact, email, password, city, street,
        state, country, zipcode, role, position,
        countryPhoneCode,countryCode
    } = req.body

    try {
        const exists = await userModel.findOne({email})
        // console.log(exists.email)

        // Checking, is user already exists

            const rawNumber = `${countryPhoneCode}${contact.replace(/[^0-9]/g, '')}`;

            const phoneNumber = parsePhoneNumberFromString(rawNumber);

            // Validate number existence, format, and match with expected country
            if (
                !phoneNumber ||
                !phoneNumber.isValid() ||
                (countryCode && phoneNumber.country !== countryCode.toUpperCase())
            ) {
                return res.json({
                success: false,
                message: `Invalid phone number for ${countryCode || 'selected country'}`,
                });
            }

            // ✅ If everything is valid, return success
            // if (phoneNumber.isValid() && (phoneNumber.country === countryCode)) {
            //     return res.json({
            //     success: false,
            //     message: 'Valid phone number',
            //     formatted: phoneNumber.formatInternational(),
            //     nationalFormat: phoneNumber.formatNational(),
            //     country: phoneNumber.country,
            //     });
            // }


        if (exists) {
            return res.json({success: false, email: `*${exists.email}*`, message: ` email already exists`})
        }

        if (email.includes("@") && phoneNumber.isValid() && (phoneNumber.country === countryCode)){

            if (password.length < 8) {
                return res.json({success: false, message: "*Enter a strong Password*"})
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

            const newUser = new userModel({
                firstname: firstname,
                lastname: lastname || "",
                email: email,
                password: hashedPassword,
                businessName: businessName,
                contact: contact,
                countryPhoneCode: countryPhoneCode,
                countryCode: countryCode,
                role: role,
                position: position,
                city: city,
                street: street,
                state: state,
                country: country,
                zipcode: zipcode,
                verificationCode: verificationCode
            })

            const user = await newUser.save()
            const token = createToken(user._id)
            SendVerificationCode(newUser.email, verificationCode, newUser.firstname, newUser.lastname)
            res.json({success: true, token, firstname: `${firstname} ${lastname}`, verificationCode, role, email: email})
        } else {
            return res.json({success: false, message: "Enter Valid email"})
        }
    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: `${error.message}`})
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const {responseCode} = req.body
        // console.log(responseCode)
        const user = await userModel.findOne({
            verificationCode: responseCode
        })

        // console.log(user)

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid or Code Expired"})
        }

        user.isVerified = true,
        user.verificationCode = undefined
        await user.save()
        await WelcomeEmail(user.email, user.firstname, user.lastname)
        return res.status(200).json({success: true, message: "Email Verified Successfully!"})

    } catch (error) {
        console.log(`Error: ${error.message}`)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const updatePassword = async (req, res) => {
    try {
        const {newPassword, email} = req.body

        const user = await userModel.findOne({email})

        if (user) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)

            user.password = hashedPassword

            await user.save()
            return res.status(200).json({success: true, message: "Password Updated Successfully!"})
        }
        else {
            return res.status(400).json({success: false, message: "Email doesn't exist!"})
        }

    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        console.log(user)

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
        res.json({success: true, token, name: `${user.firstname} ${user.lastname}`, message: "Login Successful", role: `${user.role}`, email: user.email})
    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: "*Error*"})
    }
}

export const getUsersData = async (req, res) => {
    try {
        const usersData = await userModel.find()
        // console.log(usersData)
        res.status(200).json({usersData: usersData})
    } catch (error) {
        console.log("Error Occured", error)
        res.status(400).json({message: "Failed to get users data"})
    }
}
