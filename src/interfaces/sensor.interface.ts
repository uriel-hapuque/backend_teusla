import {z} from "zod"
import { sensorRequestSchema, sensorResponseSchema, sensorSchema, sensorsResponseSchema } from "../schemas/sensor.schema"

export type tSensor = z.infer<typeof sensorSchema>
export type tSensorRequest = z.infer<typeof sensorRequestSchema>
export type tSensorResponse = z.infer<typeof sensorResponseSchema>
export type tSensorsResponse = z.infer<typeof sensorsResponseSchema>
export type tSensorUpdateRequest = tSensorRequest