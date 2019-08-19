import { Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import { Trade } from "./Trade";

@Entity()
export class Item {
    constructor(itemName, itemId, invId) {
        this.itemName = itemName; // Item name
        this.itemId = itemId;     // Item Id
        this.invId = invId;       // Item type of inventory (tf2, csgo, spiral knigts...)
        this.date = new Date(Date.now());
    }
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @PrimaryColumn()
    itemId: number;

    @Column()
    itemName: string;
 
    @Column()
    invId: string;

    @Column()
    InInventory: boolean;
    
    @Column({type: "timestamp"})
    date: Date;

    @ManyToMany(type => Trade, trade => trade.itemDelivered)
    tradeDelivered: Trade[];

    @ManyToMany(type => Trade, trade => trade.itemReceived)
    tradeReceived: Trade[];
 
}