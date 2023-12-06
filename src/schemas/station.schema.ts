import { z} from "zod"
import {sensorSchema} from "./sensor.schema"

export const stationSchema = z.object({
    id: z.string(),
    name: z.string().max(50),
    localization: z.string().max(50),
    is_active: z.boolean(),
    sensors: z.array(sensorSchema)
}) 

export const stationSchemaTest = z.object({
    id: z.string(),
    name: z.string().max(50),
    localization: z.string().max(50),
    is_active: z.boolean(),
    sensors: z.any()
}) 

export const stationResquestSchema = stationSchema.omit({id: true, sensors: true})

export const stationResponseSchema = stationResquestSchema

export const stationsResponseSchema = stationSchema.array()