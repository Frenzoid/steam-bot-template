import "reflect-metadata";
import { Connection, ConnectionManager, getConnectionManager } from "typeorm";
import { Message } from "../models/Message";
import { User } from "../models/User";

export class Config {
  public static dbName: string = process.env.DBNAME;
  public static dbPass: string = process.env.DBPASSWORD;
  public static dbUser: string = process.env.DBUSER;
  public static dbHost: string = process.env.DBHOST;
  public static dbport: string = process.env.DBPORT;

  public static connectionManager: ConnectionManager = getConnectionManager();
  public static connection: Connection = Config.connectionManager.create({
    type: "postgres",
    port: Number(Config.dbport),
    host: Config.dbHost,
    username: Config.dbUser,
    password: Config.dbPass,
    database: Config.dbName,
    entities: [
      User,
      Message,
    ],
  });
}
