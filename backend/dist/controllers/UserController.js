"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserService_1 = require("../services/UserService");
const ApiError_1 = __importDefault(require("../Utils/ApiError"));
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
            next(error);
        }
    },
    async register(req, res, next) {
        try {
            const { email, password, username } = req.body;
            if (!email || !password || !username) {
                throw new ApiError_1.default(400, "ALL_FIELDS_REQUIRED", "All fields of signup are required");
            }
            const user = await UserService_1.UserService.register(email, password, username);
            res.status(201).json(user);
        }
        catch (error) {
            next(error);
        }
    },
    async getCurrentUser(req, res) {
        try {
            const userId = req.userId;
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
            console.error(error.message);
            res.status(401).json({ message: error.message });
        }
    },
    async getByUsername(req, res) {
        try {
            const username = req.params.username;
            if (!username) {
                res.status(404).json({
                    message: "Invalid user"
                });
                return;
            }
            const user = await UserService_1.UserService.getUserByUsername(username);
            res.status(200).json(user);
        }
        catch (error) {
            console.error(error.message);
            res.status(401).json({ message: error.message });
        }
    }
};
exports.default = UserController;
