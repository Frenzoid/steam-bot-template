import { Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Item } from "./Item";
import { Config } from "../config/dbcon";
import { User } from "./User";

export enum Status {
  PENDING,
  ACCEPTED,
  DENYED
}

export enum Type {
  INCOMING,
  OUTCOMING
}

@Entity()
export class Trade {
  constructor(tradeId, partner, type) {
      this.partner = partner; // Trade partner
      this.tradeId = tradeId; // Trade Steam Id
      this.type = type;       // Type of trde
      this.date = new Date(Date.now());
  }

  async acceptTrade() {
    let promises = new Array();;

    for (let i = 0; i < this.itemDelivered.length; i++) {
      this.itemDelivered[i].InInventory = false;
      promises.push(await Config.connection.manager.save(this.itemDelivered[i]));
    }

    for (let i = 0; i < this.itemReceived.length; i++) {
      this.itemReceived[i].InInventory = true;
      promises.push(await Config.connection.manager.save(this.itemReceived[i]));
    }
    
    return await Promise.all(promises).catch((err) => {console.error(err)});    
  }
  

  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  tradeId: number;

  @ManyToOne(type => User, user => user.trade)
  partner: User;

  @Column()
  status: Status;

  @Column()
  type: string;

  @Column({type: "timestamp"})
  date: Date;

  @ManyToMany(type => Item, item => item.tradeReceived)
  itemReceived: Item[];

  @ManyToMany(type => Item, item => item.tradeDelivered)
  itemDelivered: Item[];
}