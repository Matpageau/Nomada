"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const auth_1 = require("../middlewares/auth");
const UserRouter = express_1.default.Router();
UserRouter.get("/me", auth_1.verifyToken, UserController_1.default.getCurrentUser);
UserRouter.get("/by-username/:username", UserController_1.default.getByUsername);
exports.default = UserRouter;
