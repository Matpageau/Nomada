"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRouter_1 = __importDefault(require("./UserRouter"));
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
const PostRouter_1 = __importDefault(require("./PostRouter"));
const StepRouter_1 = __importDefault(require("./StepRouter"));
const MediaRouter_1 = __importDefault(require("./MediaRouter"));
const MainRouter = express_1.default.Router();
MainRouter.use("/auth", AuthRouter_1.default);
MainRouter.use("/user", UserRouter_1.default);
MainRouter.use("/post", PostRouter_1.default);
MainRouter.use("/step", StepRouter_1.default);
MainRouter.use("/media", MediaRouter_1.default);
exports.default = MainRouter;
