"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../middlewares/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const MediaService_1 = require("../services/MediaService");
const ApiError_1 = __importDefault(require("../Utils/ApiError"));
const MediaController = {
    async upload(req, res, next) {
        try {
            const ownerId = req.userId;
            const multerReq = req;
            if (!multerReq.files || multerReq.files.length === 0) {
                throw new ApiError_1.default(400, "NO_MEDIA", "No media was given");
            }
            const uploadedUrls = [];
            for (const file of multerReq.files) {
                const result = await cloudinary_1.default.uploader.upload(file.path, {
                    folder: "my-app",
                });
                fs_1.default.unlinkSync(file.path);
                uploadedUrls.push(result.secure_url);
            }
            const mediaDoc = await MediaService_1.MediaService.uploadMedias(uploadedUrls, ownerId);
            res.status(200).json({
                mediaIds: mediaDoc.map(doc => doc._id),
                imageUrls: uploadedUrls
            });
        }
        catch (error) {
            next(error);
        }
    },
    async getMediaById(req, res, next) {
        try {
            const { mediaId } = req.params;
            const media = await MediaService_1.MediaService.getMediaById(mediaId);
            if (!media) {
                throw new ApiError_1.default(404, "NO_MEDIA_FOUND", "No media found");
            }
            res.status(200).json(media);
        }
        catch (error) {
            next(error);
        }
    }
};
exports.default = MediaController;
