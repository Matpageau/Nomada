import express from "express"
import UserController from "../controllers/UserController"
import { verifyToken } from "../middlewares/auth"

const AuthRouter = express.Router()

AuthRouter.post("/login", UserController.login)

export default AuthRouter