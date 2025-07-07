"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MediaSchema = new mongoose_1.default.Schema({
    owner_id: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["photo", "video"],
        default: "photo"
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.MediaModel = mongoose_1.default.models.Media || mongoose_1.default.model("Media", MediaSchema);
