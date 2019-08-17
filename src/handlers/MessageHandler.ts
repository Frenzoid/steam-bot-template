import "reflect-metadata";
import { Message } from "../models/Message";
import { User } from "../models/User";
import { getManager } from 'typeorm';
import * as SteamUser from 'steam-user';

export class MessageHandler {
  static msgcount: number[] = [];

  static async processMessage(message:string, nickname:string, steamID: any, client: SteamUser) {
    // Pre-prepare response.
    if (!this.msgcount[steamID]) this.msgcount[steamID] = 0;
    let response: string;    this.msgcount[steamID]++;

    // Start of sectioning and Preparing responses.
    if (message.toLowerCase().startsWith("im ")) {
      response = "Hello " + message.toLowerCase().split("im")[1] + ", im pissed.";
    }


    // Insert into db registry. [If added -> ColumnTypeUndefinedError] 
    const user = await getManager().findOne(User, steamID);
      
    // process reply.
    client.chat.sendFriendMessage([steamID], response);
    console.log("[" + MessageHandler.msgcount[steamID] + "]" + steamID.getSteam3RenderedID() + " <- " + nickname + ": " + message);
    console.log("[" + MessageHandler.msgcount[steamID] + "]" + steamID.getSteam3RenderedID() + " -> Bot: " + response);

  }

}