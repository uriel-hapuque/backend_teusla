import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { tSensorResponse, tSensorUpdateRequest } from "../../interfaces/sensor.interface";
import { Station } from "../../entities/station.entity";
import { Sensor } from "../../entities/sensor.entity";
import { sensorRequestSchema, sensorResponseSchema } from "../../schemas/sensor.schema";
export const updateSensorService = async (
  sensorId: number,
  newSensorData: tSensorUpdateRequest
): Promise<tSensorUpdateRequest> => {
  const sensorRepo: Repository<Sensor> = AppDataSource.getRepository(Sensor);

  const sensorData: Sensor | null = await sensorRepo.findOneBy({
    id: sensorId,
  });

  const updatedSensor: Sensor = sensorRepo.create({
    ...sensorData,
    ...newSensorData,
  });

  await sensorRepo.save(updatedSensor);

  const returnSensor: tSensorUpdateRequest =
    sensorRequestSchema.parse(updatedSensor);

  return returnSensor;
};