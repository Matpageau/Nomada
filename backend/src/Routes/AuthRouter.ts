import express from "express"
import UserController from "../controllers/UserController"

const AuthRouter = express.Router()

AuthRouter.post("/login", UserController.login)
AuthRouter.post("/register", UserController.register)

export default AuthRouter