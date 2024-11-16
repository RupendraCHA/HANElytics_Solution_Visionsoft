import express from "express"
import {registerUser, loginUser, logout} from "../controllers/userController.js"
const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/logout", logout)

export default userRouter