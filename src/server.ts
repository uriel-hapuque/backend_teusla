import app from "./app"
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Server está rodando");
    app.listen(3000, () => {
      console.log("Servidor executando");
    });
  })
  .catch((err) => {
    console.error("Erro durante a inicialização do Data Source", err);
  });