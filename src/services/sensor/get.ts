import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Sensor } from "../../entities/sensor.entity";
import { Station } from "../../entities/station.entity";
export const getSensorService = async (
  sensorId: number
): Promise<Sensor | null> => {
  const sensorRepo: Repository<Sensor> = AppDataSource.getRepository(Sensor);

  const sensor: Sensor | null = await sensorRepo.findOneBy({ id: sensorId });

  return sensor;
};