import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { tStationResponse, tStationUpdateRequest } from "../../interfaces/station.interface";
import { Station } from "../../entities/station.entity";
import { stationResponseSchema } from "../../schemas/station.schema";
export const updateStationService = async (
  stationId: number,
  newStationData: tStationUpdateRequest
): Promise<tStationUpdateRequest> => {
  const stationRepo: Repository<Station> = AppDataSource.getRepository(Station);

  const userData: Station | null = await stationRepo.findOneBy({ id: stationId });

  const updateStation: Station = stationRepo.create({
    ...userData,
    ...newStationData,
  });

  await stationRepo.save(updateStation);

  const updatedStation: tStationResponse = stationResponseSchema.parse(updateStation);

  return updatedStation;
};