import express from "express"
import UserRouter from "./UserRouter"
import AuthRouter from "./AuthRouter"
import PostRouter from "./PostRouter"
import StepRouter from "./StepRouter"
import MediaRouter from "./MediaRouter"

const MainRouter = express.Router()

MainRouter.use("/auth", AuthRouter)
MainRouter.use("/user", UserRouter)
MainRouter.use("/post", PostRouter)
MainRouter.use("/step", StepRouter)
MainRouter.use("/media", MediaRouter)

export default MainRouter