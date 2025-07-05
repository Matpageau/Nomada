import { PostModel } from "../models/PostModel";
import { PostType } from "../Types/Post";

export const PostService = {
  async getAllPosts(userId: string): Promise<PostType[]> {
    return await PostModel.find({owner_id: userId}).lean()
  },

  async getPost(postId: string): Promise<PostType> {
    const post = await PostModel.findById(postId).lean()
    if(!post) throw new Error("Post not found")
    
    return post
  },

  async createPost(userId: string): Promise<PostType> {
    return await PostModel.create({
      owner_id: userId
    })
  },

  async updatePost(postId: string, data: any) {
    return await PostModel.findByIdAndUpdate(postId, data, { new: true })
  }
}