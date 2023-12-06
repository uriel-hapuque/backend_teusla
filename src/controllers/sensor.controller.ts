import { Request, Response } from "express"
import { Sensor } from "../entities/sensor.entity"
import { tSensorDTO, tSensorResponse } from "../interfaces/sensor.interface"
import { createSensorService } from "../services/sensor/create"
import { getAllSensorsService, getSensorService } from "../services/sensor/get"

export const createSensorController = async (req: Request, res: Response): Promise<Response<Sensor>> => {
    const stationName: string = "Estação 1"
    const field1: any = req.query.field1
    const field2: any = req.query.field2
    const field3: any = req.query.field3
    const field4: any = req.query.field4
    const field5: any = req.query.field5
    let field6: any = req.query.field6

    if(field6 === "Não está chovendo"){
      field6 = "false"
    } else if("Esta chovendo"){
      field6 = "true"
    }

    const fieldList = [
      {name: "moisture", value: field1}, 
      {name: "temperature", value: field2}, 
      {name: "relativePressure", value: field3}, 
      {name: "absolutePressure", value: field4}, 
      {name: "ppm", value: field5}, 
      {name: "rain", value: field6}
    ]
    
    for(let i = 0; i < 6; i++){
      const sensor: tSensorResponse = await createSensorService(fieldList[i], stationName)
    }

    return res.status(201).send()
}

export const getSensorController = async (req: Request, res: Response): Promise<Response<Sensor[]>> =>{
    const sensorName: string = req.params.name

    const sensor: tSensorDTO[] = await getSensorService(sensorName)

    return res.status(200).json(sensor)
}

export const getAllSensorsController = async (req: Request, res:Response): Promise<Response<Sensor[]>> => {
  return res.status(200).json(await getAllSensorsService())
}


  