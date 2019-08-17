import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { Config } from "./config/dbcon";
import { SCC } from "./controller/SteamCliController";

// Connect with the db
Config.connection.connect().then((result: any) => {
  Config.connection.synchronize(true);
  console.log("DB connection done.");
}).catch((err) => {
  console.error(`Error syncing database: ${err}`);
});

// This will start the bot's chain-load, and also drag up any unhandled errors.
SCC.start();
