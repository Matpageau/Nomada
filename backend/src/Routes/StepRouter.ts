import express from "express"
import StepController from "../controllers/StepController"
import { verifyToken } from "../middlewares/auth"

const StepRouter = express.Router()

StepRouter.post("/", verifyToken, StepController.createStep)
StepRouter.get("/:stepId", StepController.getStep)
StepRouter.put("/:stepId", verifyToken, StepController.updateStep)

export default StepRouter