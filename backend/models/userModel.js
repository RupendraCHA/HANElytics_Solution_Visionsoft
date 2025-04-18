import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    businessName: {type: String, required: true},
    contact: {type: String, required: true},
    countryPhoneCode: {type: String, required: true},
    countryCode: {type: String, required: true},
    role: {type: String, required: true},
    position: {type: String, required: true},
    city: {type: String, required: true},
    street: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    zipcode: {type: String, required: true},
    isVerified: {type: Boolean, default: false},
    verificationCode: {type: String}
}, {timestamps: true})

const userModel = mongoose.models.consumers || mongoose.model("consumers", userSchema)

export default userModel