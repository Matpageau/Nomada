"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const PostModel_1 = require("../models/PostModel");
const StepModel_1 = require("../models/StepModel");
const ApiError_1 = __importDefault(require("../Utils/ApiError"));
exports.PostService = {
    async getAllPosts(userId) {
        return await PostModel_1.PostModel.find({ owner_id: userId }).lean();
    },
    async getPost(postId) {
        const post = await PostModel_1.PostModel.findById(postId);
        if (!post)
            throw new ApiError_1.default(404, "NO_POST_FOUND");
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
    async addStepToPost(postId, stepId, mediaIds) {
        const post = await PostModel_1.PostModel.findById(postId);
        if (!post)
            throw new ApiError_1.default(404, "NO_POST_FOUND", "No post found");
        post.steps.push(stepId);
        post.medias = mediaIds;
        await post.save();
        return post.toObject();
    },
    async getAllStepFromPost(postId) {
        return await StepModel_1.StepModel.find({ post_id: postId }).populate("medias").lean();
    }
};
