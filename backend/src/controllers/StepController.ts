import { NextFunction, Request, Response } from "express"
import { PostService } from "../services/PostService"
import { StepService } from "../services/StepService"
import { Types } from "mongoose"

const StepController = {
  async getAllStepsFromPost(req: any, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params

      const steps = await StepService.getAllStepFromPost(postId)

      res.status(200).json(steps)
    } catch (error) {
      next(error)
    }
  },

  async getStep(req: Request, res: Response, next: NextFunction) {
    try {
      const { stepId } = req.params

      const step = await StepService.getStep(stepId)

      res.status(200).json(step)
    } catch (error) {
      next(error)
    }
  },

  async createStep(req: any, res: Response, next: NextFunction) {
    try {
      const userId: string = req.userId
      const { postId, mediaIds, description, location } = req.body

      const post = await PostService.getPost(postId)

      if(!post) {
        res.status(404).json({ message: 'Post not found' })
        return
      }

      if(post.owner_id.toString() != userId) {
        res.status(403).json({ message: 'Unauthorized: You do not own this post' })
        return
      }
      
      const newStep = await StepService.createStep(
        postId,
        mediaIds,
        description,
        location.lng,
        location.lat
      )
      if(!newStep?._id) throw new Error("Error while creating step")

      const updatedPost = await PostService.addStepToPost(postId, newStep._id as Types.ObjectId)
  
      res.status(200).json(updatedPost)
    } catch (error) {
     next(error)
    }
  },

  async updateStep(req: Request, res: Response) {

  },
}

export default StepController