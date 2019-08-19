import * as SteamUser from "steam-user";
import * as SteamCommunity from "steamcommunity";
import * as SteamTradeManager from "steam-tradeoffer-manager";
import { Logins } from "../config/logins";
import { MessageHandler } from "../handlers/MessageHandler";
import { SteamComInteractor } from "../utils/SteamCommunityInteractor";
import { TradeHandler } from "../handlers/TradeHandler";

export class ClientLoginController {
  public client: SteamUser;
  public community: SteamCommunity;
  public trademanager: SteamTradeManager;
  public logins: Logins;

  constructor(logins) {
    // Login bot and setUp the trade manager.
    this.logins = logins;
    this.client = new SteamUser();
    this.community = new SteamCommunity();
    this.trademanager = new SteamTradeManager({
      steam: this.client,
      community: this.community,
      language: 'en',
    });
    this.client.logOn(this.logins.getLogin());
  }

  start() {
    this.client.on("loggedOn", () => {
      console.log("Logged in.");
      // Set status and game to play.
      this.client.setPersona(SteamUser.EPersonaState.LookingToPlay);
      this.client.gamesPlayed(202351);
      this.loadChatListeners();
      this.loadTradeListeners();
    });
  }

  
  // processes events.
  private async loadTradeListeners() {
    
    // Porcess trades.
    this.client.on("webSession", (sessionId, cookies) => {
      this.trademanager.setCookies(cookies);
      this.community.setCookies(cookies);
      this.community.startConfirmationChecker(20000, this.logins.getSecret());
    });

    this.trademanager.on("newOffer", async (offer) => {
      const partnername = await SteamComInteractor.getNicknameFromUserID(this.community, offer.partner);
      console.log("New incoming trade offer detected from " + partnername);
      TradeHandler.processTrade(offer, this.client, this.community, this.trademanager);
    });


  }

  private async loadChatListeners() {

    // process messages
    this.client.on("friendMessage", async (steamID, message) => {
      const nickname = await SteamComInteractor.getNicknameFromUserID(this.community, steamID);
      MessageHandler.processMessage(message, nickname, steamID, this.client);
    });
  }
}