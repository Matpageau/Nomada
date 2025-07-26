import { NextFunction, Request, Response } from "express";
import cloudinary from "../middlewares/cloudinary";
import fs from "fs";
import { MediaService } from "../services/MediaService";
import ApiError from "../Utils/ApiError";
import { next } from "cheerio/lib/api/traversing";

interface MulterRequest extends Request {
  files: Express.Multer.File[]
}

const MediaController = {
  async upload(req: any, res: Response, next: NextFunction) {
    try {
      const ownerId = req.userId
      const multerReq = req as MulterRequest;

      if (!multerReq.files || multerReq.files.length === 0) {
        throw new ApiError(400, "NO_MEDIA", "No media was given")
      }

      const uploadedUrls: string[] = [];

      for (const file of multerReq.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "my-app",
        });

        fs.unlinkSync(file.path);

        uploadedUrls.push(result.secure_url);
      }

      const mediaDoc = await MediaService.uploadMedias(uploadedUrls, ownerId)

      res.status(200).json({
        mediaIds: mediaDoc.map(doc => doc._id),
        imageUrls: uploadedUrls
      });
    } catch (error) {
      next(error)
    }
  },

  async getMediaById(req: Request, res: Response, next: NextFunction) {
    try {
      const { mediaId } = req.body
      
      const media = MediaService.getMediaById(mediaId)
      if(!media) {
        throw new ApiError(404, "NO_MEDIA_FOUND", "No media found")
      }

      res.status(200).json(media)
    } catch (error) {
      next(error)
    }
  }
};

export default MediaController;
