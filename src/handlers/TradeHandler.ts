import * as SteamUser from "steam-user";
import * as SteamCommunity from "steamcommunity";
import * as SteamTradeManager from "steam-tradeoffer-manager";
import { Config } from "../config/dbcon";
import { User } from "../models/User";
import { Trade, Status, Type } from "../models/Trade";

export class TradeHandler { 
  public static async processTrade(offer: any, client: SteamUser, steamcomm: SteamCommunity, steamtrademan: SteamTradeManager) {

    

  }
}