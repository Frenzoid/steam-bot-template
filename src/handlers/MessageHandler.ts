import * as SteamUser from "steam-user";
import * as SteamCommunity from "steamcommunity";
import { CCP } from "../processors/ChatCommandsProcessor";
import { Config } from "../config/dbcon";
import { Message } from "../models/Message";
import { User } from "../models/User";
import { setTimeout } from "timers";

class MessageHandler {

  public async processMessage(message: string, nickname: string, steamUserID: any, client: SteamUser, community: SteamCommunity) {
    // Pre-prepare the response.
    let response: string | string[];
    let format: number = 0;

    // Start of command detection.
    if (message.startsWith(">") && message.length >= 2) {
      message = message.replace(/\s+/g,' ');
      let args = message.split(" ");
      const command = args[0].substring(1);
      args.splice(0, 1);

      switch(command.toLowerCase()) {

        // an example of a command
        case "command1":
          response = await CCP.command1(args);
          break;

        // gets the sender's steam user info.
        case "getuserinfo":
          response = await CCP.getUserInfo(args, community, steamUserID);
          format = 1;
          break;

        // gets the sender's avatar (full picture)
        case "getuseravatar":
          response = await CCP.getAvatar(args, community, steamUserID);
          break;

        // sends an insult to the user.
        case "insult":
          response = await CCP.insult();
          break;

        default:

          break;
      }
    }








    

    // ---------------------DATABASE MANAGERING (Saves each message recived.)----------------
    
    // Create new message.
    const messageDb = new Message(message);

    // Insert into db registry.
    const user = await Config.connection.manager.findOne(User, { steamID64: steamUserID.getSteamID64() });
    // If user exists, just add the message (and update the nickname).
    if (user) {
      messageDb.user = user;
      await Config.connection.manager.save(messageDb);

      user.nickname = nickname;
      await Config.connection.manager.save(user);
    } else {
      // if user doesn't exists, creat the user, and add the mesage.
      const newUser = new User(steamUserID.getSteam3RenderedID(), steamUserID.getSteamID64(), nickname);
      await Config.connection.manager.save(newUser);

      messageDb.user = newUser;
      await Config.connection.manager.save(messageDb);
    }
    
    // --------------SEND RESPONSE TO USER---------------------
    console.log(steamUserID.getSteam3RenderedID() + " <- " + nickname + ": " + message);
    if (response) {
      if (!Array.isArray(response)) {
        this.sendMessage(response, client, steamUserID, format)
      } else if (Array.isArray(response)) {
        this.sentArrayMessage(response, client, steamUserID, format);
      }
    }
  }

  private async sendMessage(message: string, client: SteamUser, steamUserID, format = 0) {
    if (format == 1) message = '/code ' + message;

    client.chat.sendFriendMessage(steamUserID, message).then(() => {
      console.log(steamUserID.getSteam3RenderedID() + " -> Bot: " + message);
      Promise.resolve(message);
    });
  }

  private async sentArrayMessage(messages: string[], client: SteamUser, steamUserID, format = 0) {
    for(const key in messages) {
      await this.delay(1000).then(_ => {
        this.sendMessage(messages[key], client, steamUserID, format);
      });
    }
  }

  private delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  

}

export const messageHandler = new MessageHandler();