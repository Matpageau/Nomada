"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthRouter = express_1.default.Router();
AuthRouter.post("/login", UserController_1.default.login);
AuthRouter.post("/register", UserController_1.default.register);
exports.default = AuthRouter;
