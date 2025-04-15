import express from "express"
import {registerUser,verifyEmail, loginUser, updatePassword, getUsersData, getLoggedUsersData} from "../controllers/userController.js"
const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/verifyemail", verifyEmail)
userRouter.post("/updatePassword", updatePassword)
userRouter.post("/login", loginUser)
userRouter.get("/getUsersList", getUsersData)
userRouter.post("/getLoggedUserDetails", getLoggedUsersData)
export default userRouter