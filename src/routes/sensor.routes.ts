import { Router } from "express"
import { validateRequestBody } from "../middlewares/validate/validateBody"
import { sensorRequestSchema } from "../schemas/sensor.schema"
import { createSensorController, deleteSensorController, getSensorController, updateSensorController } from "../controllers/sensor.controller"
import { verifyIfSensorExists } from "../middlewares/verify/verifyIfSensorExists"

export const sensorRoutes: Router = Router()

sensorRoutes.post("/:stationId", validateRequestBody(sensorRequestSchema), createSensorController)
sensorRoutes.get("/:id", verifyIfSensorExists, getSensorController)
sensorRoutes.delete("/:id", verifyIfSensorExists, deleteSensorController)
sensorRoutes.patch("/:id", verifyIfSensorExists, updateSensorController)