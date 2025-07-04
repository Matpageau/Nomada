"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserService_1 = require("../services/UserService");
const UserController = {
    async login(req, res) {
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
            res.status(401).json({ message: error.message });
        }
    },
    async register(req, res) {
        try {
            const { email, password, username, fullName } = req.body;
            if (!email || !password || !username || !fullName) {
                res.status(400).json({ message: "All fields are required" });
                return;
            }
            const user = await UserService_1.UserService.register(email, password, username, fullName);
            res.status(201).json(user);
        }
        catch (error) {
            console.error('❌ Register error:', error.message);
            res.status(500).json({ message: error.message });
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
