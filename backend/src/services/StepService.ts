import { Types } from "mongoose"
import { StepModel } from "../models/StepModel"
import { StepType } from "../Types/Step"
import ApiError from "../Utils/ApiError"

export const StepService = {
  async getAllStepFromPost(postId: string) {
    return await StepModel.find({ post_id: postId})
  },

  async getStep(stepId: string) {
    const step = await StepModel.findById(stepId).populate("medias").lean()
    
    if(!step) throw new ApiError(404, "NO_STEP_FOUND", "No step found")
    return step
  },

  async getStepMedias(stepId: string) {
    const step = await StepModel.findById(stepId)
      .populate('medias')
      .select('medias')

    if(!step) throw new ApiError(404, "NO_STEP_FOUND", "No step found")

    return step.medias
  },

  async createStep(postId: string, mediaIds: Types.ObjectId[], description: string, lng: number, lat: number) {    
    return await StepModel.create({
      post_id: postId,
      medias: mediaIds,
      description: description,
      lng: lng,
      lat: lat
    })
  }
}