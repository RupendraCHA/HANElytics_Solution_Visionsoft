import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const userModel = mongoose.models.consumers || mongoose.model("consumers", userSchema)

export default userModel