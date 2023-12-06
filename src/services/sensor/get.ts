import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Sensor } from "../../entities/sensor.entity";
import { tSensor, tSensorDTO } from "../../interfaces/sensor.interface";

export const getSensorService = async (
  sensorName: string
): Promise<tSensorDTO[] | any> => {
  const sensorRepo: Repository<Sensor> = AppDataSource.getRepository(Sensor);

  const skip: number = 0;
  const take: number = 86400;

  const sensors: tSensor[] = await sensorRepo.find({where: {name: sensorName},
    order: {
      createdAt: "DESC",
    }, 
    skip: skip, 
    take: take
  });

  const returnList: tSensorDTO[] = []
  let values: number[] = []
  
  sensors.forEach((sensor: tSensor)=>{

    const {value, createdAt, ...sensorWithoutValues} = sensor
    const newSensorValues = {
      ...sensorWithoutValues, 
      "allValues": {
        value: value, 
        createdAt: createdAt
      }, 
      
    }
    values.push(parseInt(value))
    returnList.push(newSensorValues)
  });

  returnList.forEach((obj: tSensorDTO)=>{
    if(obj.name === "rain"){
      obj.allValues.value = JSON.parse(obj.allValues.value)
    }
  })

  const sum: number = values.reduce((acumulador, elemento) => acumulador + elemento, 0);

  const data: any = {
    average: (sum/values.length),
    highest: Math.max.apply(null, values), 
    lower: Math.min.apply(null, values)
  }
  
  return [
    ...returnList,
    data
  ]
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