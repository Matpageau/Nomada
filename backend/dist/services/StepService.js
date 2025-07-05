"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepService = void 0;
const StepModel_1 = require("../models/StepModel");
exports.StepService = {
    async getAllStepFromPost(postId) {
        return await StepModel_1.StepModel.find({ post_id: postId });
    },
    async getStep(stepId) {
        const step = await StepModel_1.StepModel.findById(stepId);
        if (!step)
            throw new Error("Step not found");
        return step;
    },
    async createStep(postId, medias, description, lng, lat) {
        return await StepModel_1.StepModel.create({
            post_id: postId,
            medias: medias,
            description: description,
            lng: lng,
            lat: lat
        });
    }
};
