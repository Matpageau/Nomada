import express from "express"
import PostController from "../controllers/PostController"
import { verifyToken } from "../middlewares/auth"

const PostRouter = express.Router()

PostRouter.get("/user/:userId", PostController.getAllPosts)
PostRouter.post("/create", verifyToken, PostController.createPost)

export default PostRouter