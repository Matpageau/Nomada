"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostService_1 = require("../services/PostService");
const ApiError_1 = __importDefault(require("../Utils/ApiError"));
const PostController = {
    async getAllPosts(req, res, next) {
        try {
            const { userId } = req.params;
            const posts = await PostService_1.PostService.getAllPosts(userId);
            res.status(200).json(posts);
        }
        catch (error) {
            next(error);
        }
    },
    async createPost(req, res, next) {
        try {
            const userId = req.userId;
            const newPost = await PostService_1.PostService.createPost(userId);
            res.status(200).json(newPost);
        }
        catch (error) {
            next(error);
        }
    },
    async updatePost(req, res, next) {
        try {
            const userId = req.userId;
            const postId = req.params.postId;
            const updateData = req.body;
            const post = await PostService_1.PostService.getPost(postId);
            if (post.owner_id != userId) {
                throw new ApiError_1.default(403, "NOT_AUTHORIZED", "You are not the owner of that post");
            }
            const updatedPost = await PostService_1.PostService.updatePost(postId, updateData);
            res.status(200).json(updatedPost);
        }
        catch (error) {
            next(error);
        }
    },
    async getAllStepFromPost(req, res, next) {
        try {
            const { postId } = req.params;
            const steps = await PostService_1.PostService.getAllStepFromPost(postId);
            res.status(200).json(steps);
        }
        catch (error) {
            next(error);
        }
    }
};
exports.default = PostController;
