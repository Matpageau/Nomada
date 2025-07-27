"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepService = void 0;
const StepModel_1 = require("../models/StepModel");
const ApiError_1 = __importDefault(require("../Utils/ApiError"));
exports.StepService = {
    async getAllStepFromPost(postId) {
        return await StepModel_1.StepModel.find({ post_id: postId });
    },
    async getStep(stepId) {
        const step = await StepModel_1.StepModel.findById(stepId).populate("medias").lean();
        if (!step)
            throw new ApiError_1.default(404, "NO_STEP_FOUND", "No step found");
        return step;
    },
    async getStepMedias(stepId) {
        const step = await StepModel_1.StepModel.findById(stepId)
            .populate('medias')
            .select('medias');
        if (!step)
            throw new ApiError_1.default(404, "NO_STEP_FOUND", "No step found");
        return step.medias;
    },
    async createStep(postId, mediaIds, description, lng, lat) {
        return await StepModel_1.StepModel.create({
            post_id: postId,
            medias: mediaIds,
            description: description,
            lng: lng,
            lat: lat
        });
    }
};
