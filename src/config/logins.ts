import * as SteamTotp from 'steam-totp';

export class Logins {
  private sharedsecret: any;
  private login: any;

  processLogin() {
    return new Promise((resolve, reject) => {
      SteamTotp.generateAuthCode(process.env.STEAMSHAREDSECRET, (error, sharedsec) => {        
        this.sharedsecret = sharedsec;
        this.login = {
          password: process.env.STEAMPASS,
          accountName: process.env.STEAMACCNAME,
          twoFactorCode: this.sharedsecret
        }
        resolve(this.login);
      })
    });
  };

  getLogin() {
    return this.login;
  }

  getSecret() {
    // this method is supposed to be fired after the initial login.
    return this.sharedsecret;
  }
}

export const login = new Logins();