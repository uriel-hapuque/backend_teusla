import { Router } from "express"
import { createSensorController, getAllSensorsController, getSensorController } from "../controllers/sensor.controller"
import { verifyIfSensorExists } from "../middlewares/verify/verifyIfSensorExists"

export const sensorRoutes: Router = Router()

sensorRoutes.post("", createSensorController)
sensorRoutes.get("/:name", verifyIfSensorExists, getSensorController)
sensorRoutes.get("", getAllSensorsController)