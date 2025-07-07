"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../middlewares/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const MediaService_1 = require("../services/MediaService");
const MediaController = {
    async upload(req, res) {
        try {
            const ownerId = req.userId;
            const multerReq = req;
            if (!multerReq.files || multerReq.files.length === 0) {
                res.status(400).json({ error: "No files provided" });
                return;
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
            console.error("Upload failed:", error);
            res.status(500).json({ error: "Media upload failed" });
        }
    },
    async getMediaById(req, res) {
        try {
            const { mediaId } = req.body;
            const media = MediaService_1.MediaService.getMediaById(mediaId);
            if (!media) {
                res.status(404).json({ error: "No media found" });
                return;
            }
            res.status(200).json(media);
        }
        catch (error) {
            res.status(500).json({ error: "Media fetching failed" });
        }
    }
};
exports.default = MediaController;
