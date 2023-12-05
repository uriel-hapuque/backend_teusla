import {z} from "zod"
import { sensorDTO, sensorRequestSchema, sensorResponseSchema, sensorSchema, sensorsResponseSchema, sensorsSchema } from "../schemas/sensor.schema"

export type tSensor = z.infer<typeof sensorSchema>
export type tSensorDTO = z.infer<typeof sensorDTO>
export type tSensors = z.infer<typeof sensorsSchema>
export type tSensorRequest = z.infer<typeof sensorRequestSchema>
export type tSensorResponse = z.infer<typeof sensorResponseSchema>
export type tSensorsResponse = z.infer<typeof sensorsResponseSchema>