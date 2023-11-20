import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Sensor } from "../../entities/sensor.entity";

export const deleteSensorService = async (
  sensorId: number
): Promise<void> => {
  const sensorRepo: Repository<Sensor> = AppDataSource.getRepository(Sensor);

  const sensor: Sensor | null = await sensorRepo.findOneBy({
    id: sensorId,
  });

  await sensorRepo.remove(sensor!);
};