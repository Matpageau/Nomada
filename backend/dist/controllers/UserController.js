"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserController = {
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await UserService_1.UserService.login(username, password);
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(200).json(user);
        }
        catch (error) {
            console.log(error.message);
            next(error);
        }
    },
    async getCurrentUser(req, res, next) {
        try {
            const userId = req.user?._id;
            if (!userId) {
                res.status(404).json({
                    message: "Invalid user"
                });
                return;
            }
            const user = await UserService_1.UserService.getCurrentUser(userId);
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }
};
exports.default = UserController;
