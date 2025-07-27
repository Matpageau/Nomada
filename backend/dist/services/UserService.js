"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiError_1 = __importDefault(require("../Utils/ApiError"));
exports.UserService = {
    async login(username, password) {
        const user = await UserModel_1.UserModel.findOne({
            $or: [{ username: username }, { email: username }]
        });
        if (!user)
            throw new ApiError_1.default(404, "USER_NOT_FOUND", "User not found");
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            throw new ApiError_1.default(403, "WRONG_PASSWORD", "Wrong password");
        return user;
    },
    async register(email, password, username) {
        const existingMail = await UserModel_1.UserModel.findOne({ email }).lean();
        if (existingMail)
            throw new ApiError_1.default(403, "EMAIL_USED", "Email already used");
        const existingUsername = await UserModel_1.UserModel.findOne({ username }).lean();
        if (existingUsername)
            throw new ApiError_1.default(403, "USERNAME_USED", "Username already used");
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new UserModel_1.UserModel({
            email,
            username,
            password: hashedPassword
        });
        return await user.save();
    },
    async getCurrentUser(userId) {
        const user = await UserModel_1.UserModel.findById(userId).select('-password').lean();
        if (!user)
            throw new ApiError_1.default(404, "USER_NOT_FOUND", "User not found");
        return user;
    },
    async getUserByUsername(username) {
        const user = await UserModel_1.UserModel.findOne({ username }).select('-password').lean();
        if (!user)
            throw new ApiError_1.default(404, "USER_NOT_FOUND", "User not found");
        return user;
    }
};
