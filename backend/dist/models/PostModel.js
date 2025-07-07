"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    owner_id: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    medias: [{
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: "Media",
            default: []
        }],
    steps: [{
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: "Step",
        }],
    tags: [{
            type: String
        }],
    status: {
        type: String,
        enum: ["private", "public", "draft"],
        default: "draft"
    }
}, {
    timestamps: true
});
exports.PostModel = mongoose_1.default.models.Post || mongoose_1.default.model("Post", PostSchema);
