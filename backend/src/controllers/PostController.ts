import { NextFunction, Request, Response } from "express"
import { PostService } from "../services/PostService"
import ApiError from "../Utils/ApiError"

const PostController = {
  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params

      const posts = await PostService.getAllPosts(userId)
      res.status(200).json(posts)
    } catch (error) {
      next(error)
    }
  },

  async createPost(req: any, res: Response, next: NextFunction) {
    try {
      const userId = req.userId
      
      const newPost = await PostService.createPost(userId)

      res.status(200).json(newPost)
    } catch (error) {
      next(error)
    }
  },

  async updatePost(req: any, res: Response, next: NextFunction) {
    try {
      const userId = req.userId
      const postId = req.params.postId
      const updateData = req.body
  
      const post = await PostService.getPost(postId)
  
      if(post.owner_id != userId) {
        throw new ApiError(403, "NOT_AUTHORIZED", "You are not the owner of that post")
      }
      
      const updatedPost = await PostService.updatePost(postId, updateData)

      res.status(200).json(updatedPost)
    } catch (error) {
      next(error)
    }
  },

  async getAllStepFromPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params
      
      const steps = await PostService.getAllStepFromPost(postId)
      
      res.status(200).json(steps)
    } catch (error) {
      next(error)
    }
  }
}

export default PostController