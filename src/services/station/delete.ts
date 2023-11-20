import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Station } from "../../entities/station.entity";

export const deleteStationService = async (stationId: number): Promise<void> => {
  const stationRepo: Repository<Station> = AppDataSource.getRepository(Station);

  const station: Station | null = await stationRepo.findOneBy({
    id: stationId,
  });

  await stationRepo.remove(station!);
};