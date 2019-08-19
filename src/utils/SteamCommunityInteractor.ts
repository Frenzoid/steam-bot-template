import * as SteamCommunity from "steamcommunity";

export class SteamComInteractor { 

  public static getNicknameFromUserID(community: SteamCommunity, steamID: any): Promise<string> {
    return new Promise((resolve, reject) => {
      community.getSteamUser(steamID, (err, user) => {
        if (err) reject(err);
        
        const nickname = user.name;
        resolve(nickname)
      });
    })
  };
}