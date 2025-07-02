"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.UserService = {
    async login(username, password) {
        const user = await UserModel_1.UserModel.findOne({
            $or: [{ username: username }, { email: username }]
        }).lean();
        if (!user)
            throw new Error("Invalid username");
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error("Invalid password");
        return user;
    },
    async getCurrentUser(userId) {
        const user = await UserModel_1.UserModel.findById(userId).select('-password').lean();
        if (!user)
            throw new Error('User not found');
        return user;
    },
    async getUserByUsername(username) {
        const user = await UserModel_1.UserModel.findOne({ username }).select('-password').lean();
        if (!user)
            throw new Error('User not found');
        return user;
    }
};
