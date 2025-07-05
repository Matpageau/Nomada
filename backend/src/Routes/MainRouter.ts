import express from "express"
import UserRouter from "./UserRouter"
import AuthRouter from "./AuthRouter"
import PostRouter from "./PostRouter"
import StepRouter from "./StepRouter"

const MainRouter = express.Router()

MainRouter.use("/auth", AuthRouter)
MainRouter.use("/user", UserRouter)
MainRouter.use("/post", PostRouter)
MainRouter.use("/step", StepRouter)

export default MainRouter