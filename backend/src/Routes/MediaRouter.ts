import express from "express"
import multer from "multer";
import MediaController from "../controllers/MediaController"
import { verifyToken } from "../middlewares/auth";

const MediaRouter = express.Router()
const upload = multer({ dest: "temp/" })

MediaRouter.post("/upload", verifyToken, upload.array("media", 20), MediaController.upload)
MediaRouter.get("/:mediaId", MediaController.getMediaById)

export default MediaRouter