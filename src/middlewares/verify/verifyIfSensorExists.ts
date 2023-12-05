import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { Sensor } from "../../entities/sensor.entity";
export const verifyIfSensorExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const sensorName: string = req.params.name;

  const sensorRepo: Repository<Sensor> = AppDataSource.getRepository(Sensor);

  const sensor: Sensor | null = await sensorRepo.findOneBy({ name: sensorName });

  if (!sensor) {
    throw new AppError("Sensor nao encontrado", 404);
  }

  return next();
};