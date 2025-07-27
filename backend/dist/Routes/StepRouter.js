"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StepController_1 = __importDefault(require("../controllers/StepController"));
const auth_1 = require("../middlewares/auth");
const StepRouter = express_1.default.Router();
StepRouter.post("/", auth_1.verifyToken, StepController_1.default.createStep);
StepRouter.get("/:stepId", StepController_1.default.getStep);
StepRouter.put("/:stepId", auth_1.verifyToken, StepController_1.default.updateStep);
StepRouter.get("/:stepId/medias", StepController_1.default.getStepMedias);
exports.default = StepRouter;
