import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Sensor } from "../../entities/sensor.entity";
export const getSensorService = async (
  sensorName: string
): Promise<Sensor | null> => {
  const sensorRepo: Repository<Sensor> = AppDataSource.getRepository(Sensor);

  const sensor: Sensor | null = await sensorRepo.findOneBy({ name: sensorName});

  if(sensorName == "Chuva"){
    sensor!.value = JSON.parse(sensor?.value!)
  }

  return sensor;
};

export const getAllSensorsService = async (): Promise<Sensor[] | null> => {
  const sensorRepo: Repository<Sensor> = AppDataSource.getRepository(Sensor)

  const sensors: Sensor[] | null = await sensorRepo.find({relations: ["station"]})
  sensors.forEach(sensor => {
    if(sensor.name == "Chuva"){
      sensor!.value = JSON.parse(sensor?.value!)
    }
  });
  
  return sensors
}