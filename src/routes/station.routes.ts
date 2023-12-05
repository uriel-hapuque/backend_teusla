import { Router } from "express";
import { createStationController, getAllStationsController, getStationController } from "../controllers/station.controller";
import { verifyIfStationExists } from "../middlewares/verify/verifyIfExistsByName";


export const stationRoutes: Router = Router()

stationRoutes.post("", createStationController)
stationRoutes.get("/:name", verifyIfStationExists, getStationController)
stationRoutes.get("", getAllStationsController)