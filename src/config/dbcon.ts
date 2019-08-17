import "reflect-metadata";
import { getConnectionManager, ConnectionManager, Connection } from 'typeorm';

export class Config {
  public static dbName: string = process.env.DBNAME;
  public static dbPass: string = process.env.DBPASSWORD;
  public static dbUser: string = process.env.DBUSER;
  public static dbHost: string = process.env.DBHOST;
  public static dbport: string = process.env.DBPORT;

  public static connectionManager: ConnectionManager = getConnectionManager();
  public static connection: Connection = Config.connectionManager.create({
    type: 'postgres',
    port: Number(Config.dbport),
    host: Config.dbHost,
    username: Config.dbUser,
    password: Config.dbPass,
    database: Config.dbName,
    entities: ['../models/*.js'],
  });
}