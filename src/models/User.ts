import {Entity, OneToMany, PrimaryColumn, Column} from "typeorm";
import { Message } from "./Message";
import { Trade } from "./Trade";
 
@Entity()
export class User {
    constructor(steamID3, steamID64, nickname) {
        this.steamID3 = steamID3;   // User's steam ID4
        this.steamID64 = steamID64; // User's steam ID64
        this.nickname = nickname;   // User's nickname
    }

    @PrimaryColumn()
    steamID3: string;

    @PrimaryColumn()
    steamID64: string;

    @Column()
    nickname: string;
 
    @OneToMany(type => Message, message => message.user)
    messages: Message[];

    @OneToMany(type => Trade, trade => trade.partner)
    trade: Trade[];

}