"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostController_1 = __importDefault(require("../controllers/PostController"));
const auth_1 = require("../middlewares/auth");
const PostRouter = express_1.default.Router();
PostRouter.get("/user/:userId", PostController_1.default.getAllPosts);
PostRouter.post("/create", auth_1.verifyToken, PostController_1.default.createPost);
exports.default = PostRouter;
