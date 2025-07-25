"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        default: ""
    },
    isPrivate: {
        type: Boolean,
        default: true
    },
    profileImg: {
        type: String
    },
    bio: {
        type: String
    }
}, {
    timestamps: true
});
exports.UserModel = mongoose_1.default.models.User || mongoose_1.default.model("User", UserSchema);
