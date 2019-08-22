import { SteamComInteractor } from "../utils/SteamCommunityInteractor";
import getInsult from "insults";
import * as moment from 'moment';

class ChatCommandsProcessor {   
  public async insult() {
    const response = await getInsult();
    return response;
  }

  public async command1(args: string[]) {
    console.log(args);
    let response = "You executed the template command. Your arguments are:";

    return  `${response} "${args.toString()}"`;
  }

  public async getUserInfo(args: string[], community, userID) {
    let userJson: any;
    let user: any;

    if (args.length == 0) {
      user = await SteamComInteractor.getPlainUser(community, userID).catch((err) => {
        console.log(userID);
        console.log(err);
      });
    } else {
      user = await SteamComInteractor.getPlainUser(community, args[0]).catch((err) => {
        console.log(args[0]);
        console.log(err);
      });
    }

    if (!user) return "Error loading user's data.";

    const group = await SteamComInteractor.getSteamGroup(community, user.primaryGroup);

    userJson = {
      name: user.name,
      onlineStatus: user.onlineState,
      stateMessage: user.stateMessage,
      vacBanned: user.vacBanned,
      tradeBanStatus: user.tradeBanState,
      isLimitedAccout: user.isLimitedAccount,
      memberSince: moment(user.memberSince).format("MMM Do YY"),
      primaryGroup: group.name,
    };

    const response = `${JSON.stringify(userJson)}`;
    return response;
  }

  public async getAvatar(args: string[], community, userID) {
    let userJson: any;
    let user: any;

    if (args.length == 0) {
      user = await SteamComInteractor.getPlainUser(community, userID).catch((err) => {
        console.log(userID);
        console.log(err);
      });
    } else {
      user = await SteamComInteractor.getPlainUser(community, args[0]).catch((err) => {
        console.log(args[0]);
        console.log(err);
      });
    }

    if (!user) return "Error loading user's data.";

    return user.getAvatarURL(["full"]);

  }
}

export const CCP = new ChatCommandsProcessor();