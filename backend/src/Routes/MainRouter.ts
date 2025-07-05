import express from "express"
import UserRouter from "./UserRouter"
import AuthRouter from "./AuthRouter"
import PostRouter from "./PostRouter"

const MainRouter = express.Router()

MainRouter.use("/auth", AuthRouter)
MainRouter.use("/user", UserRouter)
MainRouter.use("/post", PostRouter)

export default MainRouter