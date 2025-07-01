import express from "express"
import UserRouter from "./UserRouter"
import AuthRouter from "./AuthRouter"

const MainRouter = express.Router()

MainRouter.use("/auth", AuthRouter)
MainRouter.use("/user", UserRouter)

export default MainRouter