import { Router } from "express";
import { validateRequestBody } from "../middlewares/validate/validateBody";
import { stationResquestSchema } from "../schemas/station.schema";
import { createStationController, deleteStationController, getStationController, updateStationController } from "../controllers/station.controller";
import { verifyIfStationExists } from "../middlewares/verify/verifyIfExistsById";


export const stationRoutes: Router = Router()

stationRoutes.post("", validateRequestBody(stationResquestSchema), createStationController)
stationRoutes.get("/:id", verifyIfStationExists, getStationController)
stationRoutes.delete("/:id", verifyIfStationExists, deleteStationController)
stationRoutes.patch("/:id", verifyIfStationExists, updateStationController)