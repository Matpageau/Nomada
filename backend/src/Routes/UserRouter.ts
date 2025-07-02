import express from "express"
import UserController from "../controllers/UserController"
import { verifyToken } from "../middlewares/auth"

const UserRouter = express.Router()

UserRouter.get("/me", verifyToken, UserController.getCurrentUser)
UserRouter.get("/by-username/:username", UserController.getByUsername)

export default UserRouter