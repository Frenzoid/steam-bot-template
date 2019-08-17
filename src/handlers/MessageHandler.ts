import "reflect-metadata";
import * as SteamUser from "steam-user";
import { Config } from "../config/dbcon";
import { Message } from "../models/Message";
import { User } from "../models/User";

export class MessageHandler {
  public static msgcount: number[] = [];

  public static async processMessage(message: string, nickname: string, steamID: any, client: SteamUser) {
    // Pre-prepare response.
    if (!this.msgcount[steamID.getSteam3RenderedID()]) { this.msgcount[steamID] = 0; }
    let response: string;
    this.msgcount[steamID.getSteam3RenderedID()]++;

    // Start of sectioning and Preparing responses.
    if (message.toLowerCase().startsWith("im ")) {
      response = "Hello " + message.toLowerCase().split("im")[1] + ", im pissed.";
    }

    // ---------------------DATABASE MANAGERING----------------
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

// --------------PROCESS REPLIES---------------------
    client.chat.sendFriendMessage(steamID, response);
    console.log("[" + MessageHandler.msgcount[steamID.getSteam3RenderedID()] + "]" + steamID.getSteam3RenderedID() + " <- " + nickname + ": " + message);
    console.log("[" + MessageHandler.msgcount[steamID.getSteam3RenderedID()] + "]" + steamID.getSteam3RenderedID() + " -> Bot: " + response);
  }

}
