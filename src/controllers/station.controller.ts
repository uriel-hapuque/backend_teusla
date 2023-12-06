import { Request, Response } from "express";
import { Station } from "../entities/station.entity";
import { tStation, tStationRequest, tStationResponse } from "../interfaces/station.interface";
import { createStationService } from "../services/station/create";
import { getAllStationsService, getStationService } from "../services/station/get";

export const createStationController = async (req: Request, res: Response): Promise<Response<Station>> => {
  const stationData: tStationRequest = req.body
  const stationResponse: tStationResponse = await createStationService(stationData)

  return res.status(201).json(stationResponse)
}

export const getStationController = async (req: Request, res: Response): Promise<Response<Station>> => {
  const stationName: string = req.params.name

  const station: tStation[] = await getStationService(stationName)

  return res.status(200).json(station)
}

export const getAllStationsController = async (req: Request, res: Response): Promise<Response<Station[]>> => {
  const stations: tStation[] = await getAllStationsService()
  return res.status(200).json(stations)
}