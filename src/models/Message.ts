import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";

@Entity()
export class Message {
    constructor(message) {
        this.message = message;
        this.date = new Date(Date.now());
    }
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    message: string;
 
    @Column({type: "timestamp"})
    date: Date;

    @ManyToOne(type => User, user => user.messages)
    user: User;
 
}