import * as SteamUser from "steam-user";
import * as SteamCommunity from "steamcommunity";
import { CCP } from "../processors/ChatCommandsProcessor";
import { Config } from "../config/dbcon";
import { Message } from "../models/Message";
import { User } from "../models/User";

class MessageHandler {

  public async processMessage(message: string, nickname: string, steamUserID: any, client: SteamUser, community: SteamCommunity) {
    // Pre-prepare the response.
    let response: string;
    
    // Start of command detection.
    if (message.startsWith(">") && message.length >= 2) {
      message = message.replace(/\s+/g,' ');
      let args = message.split(" ");
      const command = args[0].substring(1);
      args.splice(0, 1);

      switch(command.toLowerCase()) {

        case "command1":
          response = await CCP.command1(args);
          break;

        case "getclientinfo":
          response = await CCP.getUserInfo(args, community, steamUserID);
          break;

        case "getavatar":
            response = await CCP.getAvatar(args, community, steamUserID);
            break;

        case "insult":
          response = await CCP.insult();
          break;

        default:

          break;
      }
    }








    

    // ---------------------DATABASE MANAGERING----------------
    // -------- Saves each message recived.
    
    // Create new message.
    const messageDb = new Message(message);

    // Insert into db registry. [If added -> ColumnTypeUndefinedError]
    const user = await Config.connection.manager.findOne(User, { steamID64: steamUserID.getSteamID64() });
    if (user) {
      messageDb.user = user;
      await Config.connection.manager.save(messageDb);

      user.nickname = nickname;
      await Config.connection.manager.save(user);
    } else {
      const newUser = new User(steamUserID.getSteam3RenderedID(), steamUserID.getSteamID64(), nickname);
      await Config.connection.manager.save(newUser);

      messageDb.user = newUser;
      await Config.connection.manager.save(messageDb);
    }
    
    // --------------PROCESS MESSAGES---------------------
    console.log(steamUserID.getSteam3RenderedID() + " <- " + nickname + ": " + message);

    if (response) {
      client.chat.sendFriendMessage(steamUserID, response);
      console.log(steamUserID.getSteam3RenderedID() + " -> Bot: " + response);
    }
  }

}

export const messageHandler = new MessageHandler();