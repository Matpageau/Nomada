"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostService_1 = require("../services/PostService");
const StepService_1 = require("../services/StepService");
const StepController = {
    async getAllStepsFromPost(req, res) {
        try {
            const { postId } = req.params;
            const steps = await StepService_1.StepService.getAllStepFromPost(postId);
            res.status(200).json(steps);
        }
        catch (error) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    },
    async getStep(req, res) {
        try {
            const { stepId } = req.params;
            const step = StepService_1.StepService.getStep(stepId);
            res.status(200).json(step);
        }
        catch (error) {
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    },
    async createStep(req, res) {
        try {
            const userId = req.userId;
            const { postId, mediaIds, description, location } = req.body;
            const post = await PostService_1.PostService.getPost(postId);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }
            if (post.owner_id.toString() != userId) {
                res.status(403).json({ message: 'Unauthorized: You do not own this post' });
                return;
            }
            const newStep = await StepService_1.StepService.createStep(postId, mediaIds, description, location.lng, location.lat);
            if (!newStep?._id)
                throw new Error("Error while creating step");
            const updatedPost = await PostService_1.PostService.addStepToPost(postId, newStep._id);
            res.status(200).json(updatedPost);
        }
        catch (error) {
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    },
    async updateStep(req, res) {
    },
};
exports.default = StepController;
