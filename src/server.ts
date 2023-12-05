import app from "./app"
import { AppDataSource } from "./data-source";
import { tStationsResponse } from "./interfaces/station.interface";
import { createStationService } from "./services/station/create";
import { getAllStationsService } from "./services/station/get";

AppDataSource.initialize()
  .then(async () => {
    console.log("Server está rodando");
    const stations: tStationsResponse = await getAllStationsService()
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