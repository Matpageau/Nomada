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
            throw new Error("User not found");
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error("Wrong password");
        return user;
    },
    async register(email, password, username, fullName) {
        const existingMail = await UserModel_1.UserModel.findOne({ email });
        if (existingMail)
            throw new Error("Email already used");
        const existingUsername = await UserModel_1.UserModel.findOne({ username });
        if (existingUsername)
            throw new Error("Username already used");
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new UserModel_1.UserModel({
            email,
            username,
            fullName,
            password: hashedPassword
        });
        await user.save();
        return {
            _id: user._id,
            email: user.email,
            username: user.username,
            fullName: user.fullName
        };
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
