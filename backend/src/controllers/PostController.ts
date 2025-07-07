import { Request, Response } from "express"
import { PostService } from "../services/PostService"

const PostController = {
  async getAllPosts(req: Request, res: Response) {
    try {
      const { userId } = req.params

      const posts = await PostService.getAllPosts(userId)
      res.status(200).json(posts)
    } catch (error: any) {
      res.status(401).json({ message: error.message })
    }
  },

  async createPost(req: any, res: Response) {
    try {
      const userId = req.userId
      
      const newPost = await PostService.createPost(userId)

      res.status(200).json(newPost)
    } catch (error: any) {
      res.status(401).json({ message: error.message })
    }
  },

  async updatePost(req: any, res: Response) {
    try {
      const userId = req.userId
      const postId = req.params.postId
      const updateData = req.body
  
      const post = await PostService.getPost(postId)
  
      if(post.owner_id != userId) {
        res.status(403).json({ error: "Not authorized"})
        return
      }
      
      const updatedPost = await PostService.updatePost(postId, updateData)

      res.status(200).json(updatedPost)
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to update post' })
    }
  },

  async getAllStepFromPost(req: Request, res: Response) {
    try {
      const { postId } = req.params
      
      const steps = await PostService.getAllStepFromPost(postId)
      
      res.status(200).json(steps)
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch steps' })
    }
  }
}

export default PostController