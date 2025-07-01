"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.UserRepository = {
    async login(username, password) {
        const user = await UserModel_1.UserModel.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        });
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Wrong password");
        }
        return user;
    },
    async findById(id) {
        return UserModel_1.UserModel.findById(id);
    }
};
