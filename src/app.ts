import "reflect-metadata";
import "express-async-errors";
import { handleErrors } from "./error";
const cors = require("cors")

import express, { Application } from "express";
import { sensorRoutes } from "./routes/sensor.routes";
import { stationRoutes } from "./routes/station.routes";
const app: Application = express();
app.use(express.json());
app.use(cors())

app.use("/station", stationRoutes)
app.use("/sensor", sensorRoutes)

app.use(handleErrors);

app.listen(3001)

export default app;