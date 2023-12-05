import { Request, Response } from "express"
import { Sensor } from "../entities/sensor.entity"
import { tSensorResponse } from "../interfaces/sensor.interface"
import { createSensorService } from "../services/sensor/create"
import { getAllSensorsService, getSensorService } from "../services/sensor/get"

export const createSensorController = async (req: Request, res: Response): Promise<Response<Sensor>> => {
    const stationName: string = "Estação 1"
    const field1: any = req.query.field1
    const field2: any = req.query.field2
    const field3: any = req.query.field3
    const field4: any = req.query.field4
    const field5: any = req.query.field5
    const field6: any = req.query.field6

    const fieldList = [
      {name: "Umidade", value: field1}, 
      {name: "Temperatura", value: field2}, 
      {name: "Pressão Relativa", value: field3}, 
      {name: "Pressão Absoluta", value: field4}, 
      {name: "PPM", value: field5}, 
      {name: "Chuva", value: field6}
    ]
    
    for(let i = 0; i < 6; i++){
      const sensor: tSensorResponse = await createSensorService(fieldList[i], stationName)
    }

    return res.status(201).send()
}

export const getSensorController = async (req: Request, res: Response): Promise<Response<Sensor>> =>{
    const sensorName: string = req.params.name

    const sensor: Sensor | null = await getSensorService(sensorName)

    return res.status(200).json(sensor)
}

export const getAllSensorsController = async (req: Request, res:Response): Promise<Response<Sensor[]>> => {
  return res.status(200).json(await getAllSensorsService())
}


  