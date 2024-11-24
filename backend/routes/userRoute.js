import express from "express"
import {registerUser,verifyEmail, loginUser} from "../controllers/userController.js"
const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/verifyemail", verifyEmail)
userRouter.post("/login", loginUser)
export default userRouter