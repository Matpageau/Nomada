"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const PostModel_1 = require("../models/PostModel");
exports.PostService = {
    async getAllPosts(userId) {
        return await PostModel_1.PostModel.find({ owner_id: userId }).lean();
    },
    async getPost(postId) {
        const post = await PostModel_1.PostModel.findById(postId).lean();
        if (!post)
            throw new Error("Post not found");
        return post;
    },
    async createPost(userId) {
        return await PostModel_1.PostModel.create({
            owner_id: userId
        });
    },
    async updatePost(postId, data) {
        return await PostModel_1.PostModel.findByIdAndUpdate(postId, data, { new: true });
    },
    async addStepToPost(postId, stepId) {
        const post = await PostModel_1.PostModel.findById(postId);
        if (!post)
            throw new Error("Post not found");
        post.steps.push(stepId);
        await post.save();
        return post.toObject();
    }
};
