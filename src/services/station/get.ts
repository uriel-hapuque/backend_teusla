import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Station } from "../../entities/station.entity";
import {tStation } from "../../interfaces/station.interface";
import { tSensor } from "../../interfaces/sensor.interface";
import { getSensorService } from "../sensor/get";

export const getStationService = async (
  stationName: string
): Promise<tStation[]> => {  
  const stationRepo: Repository<Station> = AppDataSource.getRepository(Station)

  const station: Station | any = await stationRepo.findOne({
    where:{ name: stationName}, 
    relations: ["sensors"],
  });

  station?.sensors.map((obj: tSensor)=>{
    if(obj.name === "rain"){
      obj.value = JSON.parse(obj.value)
    }
  })

  const groupedSensors = station!.sensors.reduce((acc:any[], sensor: any) => {
    const { id, name, value, createdAt } = sensor;
    acc[name] = acc[name] || [];
    acc[name].push({ id, name, allValues: { value, createdAt } });
    return acc;
  }, {} as Record<string, any>);

  const {sensors, ...stationWithoutSensors} = station!

  groupedSensors.rain = await getSensorService("rain")
  groupedSensors.ppm = await getSensorService("ppm")
  groupedSensors.moisture = await getSensorService("moisture")
  groupedSensors.temperature = await getSensorService("temperature")
  groupedSensors.relativePressure = await getSensorService("relativePressure")
  groupedSensors.absolutePressure = await getSensorService("absolutePressure")
  
  const returnStation: tStation[] = {
    ...stationWithoutSensors,
     sensors: groupedSensors
    }
   
  return returnStation;
};

export const getAllStationsService = async (): Promise<tStation[]> =>{
  const stationRepo: Repository<Station> = AppDataSource.getRepository(Station);
  const stations: Station[] = await stationRepo.find({relations: ["sensors"]})

   const transformedData = stations.map((station: Station) => {
    const { id, name, localization, is_active, sensors } = station;

    const transformedSensors = sensors.reduce((acc:any, sensor:any) => {
      const { id, name, value, createdAt } = sensor;

      if (!acc[name]) {
        acc[name] = [];
      }

      if (name === 'rain') {
        acc[name].push({
          id,
          name,
          allValues: {
            value: JSON.parse(value), 
            createdAt,
          },
        });
      } 
      else{
        acc[name].push({
        id,
        name,
        allValues: { value, createdAt },
      });
    }

      return acc;
    }, {});

    return {
      id,
      name,
      localization,
      is_active,
      sensors: transformedSensors,
    };
  });

  return transformedData
}
