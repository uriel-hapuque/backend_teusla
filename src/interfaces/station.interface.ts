import {z} from "zod"
import { stationResponseSchema, stationResquestSchema, stationSchema, stationSchemaTest, stationsResponseSchema } from "../schemas/station.schema"

export type tStation = z.infer<typeof stationSchemaTest>
export type tStationResponse = z.infer<typeof stationResponseSchema>
export type tStationRequest = z.infer<typeof stationResquestSchema>
export type tStationsResponse = z.infer<typeof stationsResponseSchema>