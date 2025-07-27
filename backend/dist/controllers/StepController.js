"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostService_1 = require("../services/PostService");
const StepService_1 = require("../services/StepService");
const ApiError_1 = __importDefault(require("../Utils/ApiError"));
const StepController = {
    async getAllStepsFromPost(req, res, next) {
        try {
            const { postId } = req.params;
            const steps = await StepService_1.StepService.getAllStepFromPost(postId);
            res.status(200).json(steps);
        }
        catch (error) {
            next(error);
        }
    },
    async getStep(req, res, next) {
        try {
            const { stepId } = req.params;
            const step = await StepService_1.StepService.getStep(stepId);
            res.status(200).json(step);
        }
        catch (error) {
            next(error);
        }
    },
    async createStep(req, res, next) {
        try {
            const userId = req.userId;
            const { postId, mediaIds, description, location } = req.body;
            const post = await PostService_1.PostService.getPost(postId);
            if (!post) {
                throw new ApiError_1.default(404, "NO_POST_FOUND", "No post found");
            }
            if (post.owner_id.toString() != userId) {
                throw new ApiError_1.default(403, "NOT_AUTHORIZED", "You are not the owner of that post");
            }
            const newStep = await StepService_1.StepService.createStep(postId, mediaIds, description, location.lng, location.lat);
            if (!newStep?._id)
                throw new ApiError_1.default(500, "ERROR_WHILE_CREATING", "Error while creating step");
            const updatedPost = await PostService_1.PostService.addStepToPost(postId, newStep._id.toString(), mediaIds);
            res.status(200).json(updatedPost);
        }
        catch (error) {
            next(error);
        }
    },
    async updateStep(req, res) {
    },
    async getStepMedias(req, res, next) {
        try {
            const { stepId } = req.params;
            const step = await StepService_1.StepService.getStepMedias(stepId);
            res.status(200).json(step);
        }
        catch (error) {
            next(error);
        }
    }
};
exports.default = StepController;
