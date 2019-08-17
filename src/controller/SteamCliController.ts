import * as SteamUser from "steam-user";
import { LOGIN } from "../config/logins";
import { MessageHandler } from "../handlers/MessageHandler";

class ClientLoginController {
  public client: SteamUser;
  constructor() {
    // Login bot.
    this.client = new SteamUser();
    this.client.logOn(LOGIN);
  }

  public start() {
    this.client.on("loggedOn", () => {
      console.log("Loged in.");
      // Set status and game to play.
      this.client.setPersona(SteamUser.EPersonaState.LookingToPlay);
      this.client.gamesPlayed(202351);
      this.load();
    });
  }

  // processes events.
  private load() {

    // process messages
    this.client.on("friendMessage", (steamID, message) => {
      this.client.getPersonas([steamID], (err,  personas) => {
        const nickname = personas[steamID.getSteamID64()].player_name;
        MessageHandler.processMessage(message, nickname, steamID, this.client);
      });
    });

  }
}

export const SCC = new ClientLoginController();
