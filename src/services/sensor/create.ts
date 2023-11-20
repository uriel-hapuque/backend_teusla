import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { tSensorRequest } from "../../interfaces/sensor.interface";
import { Sensor } from "../../entities/sensor.entity";
import { Station } from "../../entities/station.entity";
import { AppError } from "../../error";

export const createSensorService = async (
  sensorData: tSensorRequest,
  stationId: number
): Promise<Sensor | Sensor[] | any> => {
  const sensorRepo: Repository<Sensor> = AppDataSource.getRepository(Sensor);

  const stationRepo: Repository<Station> = AppDataSource.getRepository(Station);

  const station: any = await stationRepo.findOneBy({ id: stationId });

  if (!station) {
    throw new AppError("Estação não encontrada", 404);
  }

  const sensor = sensorRepo.create({ ...sensorData, station: station.id });

  await sensorRepo.save(sensor);

  return sensor;
};