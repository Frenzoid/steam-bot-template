import * as SteamUser from "steam-user";

export class UserHandler { 

  public static getNickname(client: SteamUser, steamID: any): Promise<string> {
    return new Promise((resolve, reject) => {
      client.getPersonas([steamID], (err, personas) => {
      if (err) reject(err);
      const nickname = personas[steamID.getSteamID64()].player_name;
      resolve(nickname);
    });
  });
  
  }
}