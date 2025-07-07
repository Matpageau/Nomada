import { Request, Response } from "express";
import cloudinary from "../middlewares/cloudinary";
import fs from "fs";
import { MediaService } from "../services/MediaService";

interface MulterRequest extends Request {
  files: Express.Multer.File[]
}

const MediaController = {
  async upload(req: any, res: Response) {
    try {
      const ownerId = req.userId
      const multerReq = req as MulterRequest;

      if (!multerReq.files || multerReq.files.length === 0) {
        res.status(400).json({ error: "No files provided" });
        return
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
    } catch (error: any) {
      console.error("Upload failed:", error);
      res.status(500).json({ error: "Media upload failed" });
    }
  },

  async getMediaById(req: Request, res: Response) {
    try {
      const { mediaId } = req.body
      
      const media = MediaService.getMediaById(mediaId)
      if(!media) {
        res.status(404).json({ error: "No media found"})
        return
      }

      res.status(200).json(media)
    } catch (error) {
      res.status(500).json({ error: "Media fetching failed" });
    }
  }
};

export default MediaController;
