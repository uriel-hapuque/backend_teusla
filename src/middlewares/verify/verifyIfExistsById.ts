import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { Station } from "../../entities/station.entity";
export const verifyIfStationExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const stationId: number = parseInt(req.params.id);

  const stationRepo: Repository<Station> = AppDataSource.getRepository(Station);

  const station: Station | null = await stationRepo.findOneBy({ id: stationId });

  if (!station) {
    throw new AppError("Estação não encontrada", 404);
  }

  return next();
};