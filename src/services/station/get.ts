import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Station } from "../../entities/station.entity";
import {tStation, tStationsResponse } from "../../interfaces/station.interface";
import { stationSchemaTest, stationsResponseSchema } from "../../schemas/station.schema";

export const getStationService = async (
  stationName: string
): Promise<tStation> => {
  const stationRepo: Repository<Station> = AppDataSource.getRepository(Station);

  const station: Station | null = await stationRepo.findOne({where:{ name: stationName}, relations: ["sensors"]});

  const groupedSensors = station!.sensors.reduce((acc, sensor) => {
    const { id, name, value, createdAt } = sensor;
    acc[name] = acc[name] || [];
    acc[name].push({ id, name, allValues: { value, createdAt } });
    return acc;
  }, {} as Record<string, any>);

  const {sensors, ...stationWithoutSensors} = station!

  const finalReturn: any = {...stationWithoutSensors, sensors: groupedSensors}

  const returnStation: tStation = stationSchemaTest.parse(finalReturn);

  return returnStation;
};

export const getAllStationsService = async (): Promise<tStationsResponse> =>{
  const stationRepo: Repository<Station> = AppDataSource.getRepository(Station);
  const station: Station[] = await stationRepo.find({relations: ["sensors"]})


  const returnStation: tStationsResponse = stationsResponseSchema.parse(station)

  return returnStation
}
