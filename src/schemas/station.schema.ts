import {z} from "zod"

export const stationSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    localization: z.string().max(50),
    is_active: z.boolean()
}) 

export const stationResquestSchema = stationSchema.omit({id: true})

export const stationUpdateRequestSchema = stationResquestSchema

export const stationResponseSchema = stationResquestSchema

export const stationsResponseSchema = stationResponseSchema.array()