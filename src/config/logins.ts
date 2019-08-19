import * as SteamTotp from 'steam-totp';

export class Logins {
  private sharedsecret: any;
  private login: any;

  async processLogin() {
    this.sharedsecret = await SteamTotp.generateAuthCode(process.env.STEAMSHAREDSECRET);
    this.login = {
      password: process.env.STEAMPASS,
      accountName: process.env.STEAMACCNAME,
      twoFactorCode: this.sharedsecret
    }

    return login;
  }

  getLogin() {
    return this.login;
  }

  getSecret() {
    // this method is supposed to be fired after the initial login.
    return this.sharedsecret;
  }
}

export const login = new Logins();