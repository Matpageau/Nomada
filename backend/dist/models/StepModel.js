"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const StepSchema = new mongoose_1.default.Schema({
    post_id: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "Post"
    },
    lng: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    medias: [{
            type: String,
            default: []
        }],
    description: {
        type: String
    },
    date_from: {
        type: Date
    },
    date_to: {
        type: Date
    }
}, {
    timestamps: true
});
exports.StepModel = mongoose_1.default.models.Step || mongoose_1.default.model("Step", StepSchema);
