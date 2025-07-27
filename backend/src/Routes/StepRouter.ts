import express from "express"
import StepController from "../controllers/StepController"
import { verifyToken } from "../middlewares/auth"
import MediaController from "../controllers/MediaController"

const StepRouter = express.Router()

StepRouter.post("/", verifyToken, StepController.createStep)
StepRouter.get("/:stepId", StepController.getStep)
StepRouter.put("/:stepId", verifyToken, StepController.updateStep)
StepRouter.get("/:stepId/medias", StepController.getStepMedias)

export default StepRouter