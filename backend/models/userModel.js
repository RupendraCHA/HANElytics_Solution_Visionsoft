import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bussinessName: {type: String, required: true},
    contact: {type: String, required: true},
    city: {type: String, required: true},
    street: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    zipcode: {type: String, required: true},

})

const userModel = mongoose.models.consumers || mongoose.model("consumers", userSchema)

export default userModel