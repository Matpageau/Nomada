"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostService_1 = require("../services/PostService");
const PostController = {
    async getAllPosts(req, res) {
        try {
            const { userId } = req.params;
            const posts = await PostService_1.PostService.getAllPosts(userId);
            res.status(200).json(posts);
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }
    },
    async createPost(req, res) {
        try {
            const userId = req.userId;
            const newPost = await PostService_1.PostService.createPost(userId);
            res.status(200).json(newPost);
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }
    },
    async updatePost(req, res) {
        try {
            const userId = req.userId;
            const postId = req.params.postId;
            const updateData = req.body;
            const post = await PostService_1.PostService.getPost(postId);
            if (post.owner_id != userId) {
                res.status(403).json({ error: "Not authorized" });
                return;
            }
            const updatedPost = await PostService_1.PostService.updatePost(postId, updateData);
            res.status(200).json(updatedPost);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update post' });
        }
    }
};
exports.default = PostController;
