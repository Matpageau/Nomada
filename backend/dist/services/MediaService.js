"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const MediaModel_1 = require("../models/MediaModel");
exports.MediaService = {
    async uploadMedias(mediaUrls, ownerId) {
        const mediaDocs = mediaUrls.map((url) => ({
            url,
            owner_id: ownerId
        }));
        const mediaDoc = await MediaModel_1.MediaModel.insertMany(mediaDocs);
        return mediaDoc;
    },
    async getMediaById(mediaId) {
        return await MediaModel_1.MediaModel.findById(mediaId).lean();
    }
};
