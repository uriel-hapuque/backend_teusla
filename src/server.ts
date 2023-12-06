import { Repository } from "typeorm";
import app from "./app"
import { AppDataSource } from "./data-source";
import { createStationService } from "./services/station/create";
import { Station } from "./entities/station.entity";

AppDataSource.initialize()
  .then(async () => {
    console.log("Server está rodando");
    const stationRepo: Repository<Station> = AppDataSource.getRepository(Station);
    const stations: Station[] | any = await stationRepo.find({relations: ["sensors"]})
    if(stations.length <= 0){
      createStationService({
        name: "Estação 1",
        localization: "CEPLAC",
        is_active: true
      })
    }
    app.listen(3000, () => {
      console.log("Servidor executando");
    });
  })
  .catch((err) => {
    console.error("Erro durante a inicialização do Data Source", err);
  });