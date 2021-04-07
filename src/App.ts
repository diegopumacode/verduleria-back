import * as express from "express";
import { createConnection, Connection } from "typeorm";

export default class App {
  public app: express.Application;
  public port: number;
  public connection: Connection;

  constructor(controllers: any[], port: number) {
    this.app = express();
    this.port = port;
    this.initializeModels();
    this.initializeMiddleware();
    this.initializeControllers(controllers)
  }

  private async initializeModels() {
    const connection = await createConnection();
    if (connection == undefined) {
      throw new Error("Error connecting to database");
    }
    connection.synchronize();
    this.connection = connection;
    console.log(this.connection.isConnected)
  }

  private initializeMiddleware() {
    this.app.use(express.json());
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`SERVER RUNNING --- PORT : ${this.port}`);
    });
  }
}
