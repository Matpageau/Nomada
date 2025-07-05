import express from "express"
import PostController from "../controllers/PostController"
import { verifyToken } from "../middlewares/auth"

const PostRouter = express.Router()

PostRouter.get("/:userId", PostController.getAllPosts)
PostRouter.post("/create", verifyToken, PostController.createPost)
PostRouter.post("/:postId/step", verifyToken, PostController.updatePost)

export default PostRouter