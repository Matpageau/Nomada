import { PostModel } from "../models/PostModel";
import { PostType } from "../Types/Post";
import { StepModel } from "../models/StepModel";
import ApiError from "../Utils/ApiError";

export const PostService = {
  async getAllPosts(userId: string) {
    return await PostModel.find({owner_id: userId}).lean()
  },

  async getPost(postId: string) {
    const post = await PostModel.findById(postId)
    if(!post) throw new ApiError(404, "NO_POST_FOUND")
    
    return post
  },

  async createPost(userId: string) {
    return await PostModel.create({
      owner_id: userId
    })
  },

  async updatePost(postId: string, data: any) {
    return await PostModel.findByIdAndUpdate(postId, data, { new: true })
  },

  async addStepToPost(postId: string, stepId: string, mediaIds: string[]): Promise<PostType> {
    const post = await PostModel.findById(postId)
    if(!post) throw new ApiError(404, "NO_POST_FOUND", "No post found")
    
    post.steps.push(stepId)
    post.medias = mediaIds
    await post.save()

    return post.toObject() as PostType
  },

  async getAllStepFromPost(postId: string) {
    return await StepModel.find({ post_id: postId }).populate("medias").lean()
  }
}