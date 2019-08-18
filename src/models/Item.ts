import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";

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

    @Column({type: "timestamp"})
    date: Date;

    @ManyToOne(type => User, user => user.messages)
    user: User;
 
}