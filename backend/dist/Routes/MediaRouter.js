"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const MediaController_1 = __importDefault(require("../controllers/MediaController"));
const auth_1 = require("../middlewares/auth");
const MediaRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "temp/" });
MediaRouter.post("/upload", auth_1.verifyToken, upload.array("media", 20), MediaController_1.default.upload);
MediaRouter.get("/:mediaId", MediaController_1.default.getMediaById);
exports.default = MediaRouter;
