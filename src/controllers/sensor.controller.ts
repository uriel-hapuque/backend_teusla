import { Request, Response } from "express"
import { Sensor } from "../entities/sensor.entity"
import { tSensorRequest, tSensorResponse, tSensorUpdateRequest, tSensorsResponse } from "../interfaces/sensor.interface"
import { createSensorService } from "../services/sensor/create"
import { deleteSensorService } from "../services/sensor/delete"
import { getSensorService } from "../services/sensor/get"
import { updateSensorService } from "../services/sensor/update"

export const createSensorController = async (req: Request, res: Response): Promise<Response<Sensor>> => {
    const stationId: number = parseInt(req.params.stationId)
    const sensorData: tSensorRequest = req.body
    const sensor: tSensorResponse = await createSensorService(sensorData, stationId)

    return res.status(201).json(sensor)
}

export const getSensorController = async (req: Request, res: Response): Promise<Response<Sensor>> =>{
    const sensorId: number = parseInt(req.params.id)

    const sensor: Sensor | null = await getSensorService(sensorId)

    return res.status(200).json(sensor)
}

export const deleteSensorController = async (
    req: Request,
    res: Response
): Promise<Response<Sensor>> => {
    const sensorId: number = parseInt(req.params.id);
  
    await deleteSensorService(sensorId);
    return res.status(204).send();
};

export const updateSensorController = async (
    req: Request,
    res: Response
  ): Promise<Response<Sensor>> => {
  
    const sensorId: number = parseInt(req.params.id);
  
    const newSensorData: tSensorUpdateRequest = req.body;
  
    const updatedSensor: tSensorUpdateRequest = await updateSensorService(
      sensorId,
      newSensorData
    );
  
    return res.status(200).json(updatedSensor);
  };

  