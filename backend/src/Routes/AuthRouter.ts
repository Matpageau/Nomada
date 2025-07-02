import express from "express"
import UserController from "../controllers/UserController"

const AuthRouter = express.Router()

AuthRouter.post("/login", UserController.login)

export default AuthRouter