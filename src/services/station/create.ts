import { AppDataSource } from "../../data-source";
import { Station } from "../../entities/station.entity";
import { Repository } from "typeorm";
import { stationResponseSchema } from "../../schemas/station.schema";
import { tStationRequest, tStationResponse } from "../../interfaces/station.interface";

export const createStationService = async (
  stationData: tStationRequest
): Promise<tStationResponse> => {
  const stationRepo: Repository<Station> = AppDataSource.getRepository(Station);

  const station: Station = stationRepo.create(stationData);

  await stationRepo.save(station);

  const returnUser: tStationResponse = stationResponseSchema.parse(station);

  return returnUser;
};