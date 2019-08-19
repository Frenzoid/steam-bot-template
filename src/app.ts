import * as dotenv from "dotenv";
dotenv.config();
import { Config } from "./config/dbcon";
import { login } from  "./config/logins";
import { ClientLoginController } from "./controller/SteamCliController";

// Connect with the db
Config.connection.connect().then((result: any) => {
  Config.connection.synchronize(true);
  console.log("DB connection done.");
}).catch((err) => {
  console.error(`Error syncing database: ${err}`);
});

// Star bot.
login.processLogin().then(() => {
  const scc = new ClientLoginController(login);
  scc.start();
});

