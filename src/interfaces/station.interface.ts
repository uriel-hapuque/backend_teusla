import {z} from "zod"
import { stationResponseSchema, stationResquestSchema, stationSchema, stationUpdateRequestSchema, stationsResponseSchema } from "../schemas/station.schema"

export type tStation = z.infer<typeof stationSchema>
export type tStationResponse = z.infer<typeof stationResponseSchema>
export type tStationRequest = z.infer<typeof stationResquestSchema>
export type tStationsResponse = z.infer<typeof stationsResponseSchema>
export type tStationUpdateRequest = z.infer<typeof stationUpdateRequestSchema>