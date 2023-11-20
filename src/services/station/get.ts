import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Station } from "../../entities/station.entity";
import {tStationResponse } from "../../interfaces/station.interface";
import { stationResponseSchema } from "../../schemas/station.schema";

export const getStationService = async (
  stationId: number
): Promise<tStationResponse> => {
  const stationRepo: Repository<Station> = AppDataSource.getRepository(Station);

  const station: Station | null = await stationRepo.findOneBy({ id: stationId });

  const returnStation: tStationResponse = stationResponseSchema.parse(station);

  return returnStation;
};