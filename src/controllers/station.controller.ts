import { Request, Response } from "express";
import { Station } from "../entities/station.entity";
import { tStationRequest, tStationResponse, tStationUpdateRequest } from "../interfaces/station.interface";
import { createStationService } from "../services/station/create";
import { getStationService } from "../services/station/get";
import { deleteStationService } from "../services/station/delete";
import { updateStationService } from "../services/station/update";

export const createStationController = async (req: Request, res: Response): Promise<Response<Station>> => {
    const stationData: tStationRequest = req.body
    const stationResponse: tStationResponse = await createStationService(stationData)

    return res.status(201).json(stationResponse)
}

export const getStationController = async (req: Request, res: Response): Promise<Response<Station>> =>{
    const stationId: number = parseInt(req.params.id)

    const station: tStationResponse = await getStationService(stationId)

    return res.status(200).json(station)
}

export const deleteStationController = async (req:Request, res:Response): Promise<Response<Station>> => {
    const stationId: number = parseInt(req.params.id)

    await deleteStationService(stationId)

    return res.status(204).send()
}

export const updateStationController = async (
    req: Request,
    res: Response
  ): Promise<Response<Station>> => {
    const stationId: number = parseInt(req.params.id);
    const newStationData: tStationUpdateRequest = req.body;
  
    const updatedStation: tStationUpdateRequest = await updateStationService(
      stationId,
      newStationData
    );
  
    return res.status(200).json(updatedStation);
  };