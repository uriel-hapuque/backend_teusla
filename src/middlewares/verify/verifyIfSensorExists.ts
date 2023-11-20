import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { Station } from "../../entities/station.entity";
import { Sensor } from "../../entities/sensor.entity";
export const verifyIfSensorExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const sensorId: number = parseInt(req.params.id);

  const sensorRepo: Repository<Sensor> = AppDataSource.getRepository(Sensor);

  const sensor: Sensor | null = await sensorRepo.findOneBy({ id: sensorId });

  if (!sensor) {
    throw new AppError("Sensor nao encontrado", 404);
  }

  return next();
};