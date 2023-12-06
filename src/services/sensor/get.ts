import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Sensor } from "../../entities/sensor.entity";
import { tSensor, tSensorDTO } from "../../interfaces/sensor.interface";

export const getSensorService = async (
  sensorName: string
): Promise<tSensorDTO[] | any> => {
  const sensorRepo: Repository<Sensor> = AppDataSource.getRepository(Sensor);

  const skip: number = 0;
  const take: number = 5;

  const sensors: tSensor[] = await sensorRepo.find({where: {name: sensorName},
    order: {
      createdAt: "DESC",
    }, 
    skip: skip, 
    take: take
  });

  const returnList: tSensorDTO[] = []
  
  sensors.forEach((sensor: tSensor)=>{
    const {value, createdAt, ...sensorWithoutValues} = sensor
    const newSensorValues: tSensorDTO = {...sensorWithoutValues, "allValues": {
      value: value, 
      createdAt: createdAt
    }}

    
    returnList.push(newSensorValues)
  });

  returnList.forEach((obj: tSensorDTO)=>{
    if(obj.name === "rain"){
      obj.allValues.value = JSON.parse(obj.allValues.value)
    }
  })
  
  return returnList;
};

export const getAllSensorsService = async (): Promise<Sensor[] | null> => {
  const sensorRepo: Repository<Sensor> = AppDataSource.getRepository(Sensor)

  const sensors: Sensor[] | null = await sensorRepo.find({relations: ["station"]})
  sensors.forEach(sensor => {
    if(sensor.name == "rain"){
      sensor!.value = JSON.parse(sensor?.value!)
    }
  });
  
  return sensors
}