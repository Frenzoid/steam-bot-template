import "reflect-metadata";
import * as SteamUser from "steam-user";
import { Config } from "../config/dbcon";
import { Message } from "../models/Message";
import { User } from "../models/User";

export class MessageHandler {

  public static async processMessage(message: string, nickname: string, steamID: any, client: SteamUser) {
    // Pre-prepare the response.
    let response: string;

    // Start of sectioning and Preparing responses.
    if (message.toLowerCase().startsWith("im ")) {
      response = "Hello " + message.toLowerCase().split("im")[1] + ", im pissed.";
    }

    // ---------------------DATABASE MANAGERING----------------
    // -------- Saves each message recived.
    // Create new message.
    const messageDb = new Message(message);

    // Insert into db registry. [If added -> ColumnTypeUndefinedError]
    const user = await Config.connection.manager.findOne(User, { steamID64: steamID.getSteamID64() });
    if (user) {
      messageDb.user = user;
      await Config.connection.manager.save(messageDb);

      user.nickname = nickname;
      await Config.connection.manager.save(user);
    } else {
      const newUser = new User(steamID.getSteam3RenderedID(), steamID.getSteamID64(), nickname);
      await Config.connection.manager.save(newUser);

      messageDb.user = newUser;
      await Config.connection.manager.save(messageDb);
    }

    // --------------PROCESS MESSAGES---------------------
    console.log(steamID.getSteam3RenderedID() + " <- " + nickname + ": " + message);

    if (response) {
      client.chat.sendFriendMessage(steamID, response);
      console.log(steamID.getSteam3RenderedID() + " -> Pissed Bot: " + response);
    }
  }

}
