import { Types } from "mongoose"
import { StepModel } from "../models/StepModel"
import { StepType } from "../Types/Step"

export const StepService = {
  async getAllStepFromPost(postId: string): Promise<StepType[]> {
    return await StepModel.find({ post_id: postId})
  },

  async getStep(stepId: string): Promise<StepType> {
    const step = await StepModel.findById(stepId).populate("medias").lean()
    
    if(!step) throw new Error("Step not found")
    return step
  },

  async createStep(postId: string, mediaIds: Types.ObjectId[], description: string, lng: number, lat: number): Promise<StepType> {    
    return await StepModel.create({
      post_id: postId,
      medias: mediaIds,
      description: description,
      lng: lng,
      lat: lat
    })
  }
}