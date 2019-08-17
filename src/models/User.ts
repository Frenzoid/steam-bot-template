import "reflect-metadata";
import {Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Column} from "typeorm";
import { Message } from "./Message";
 
@Entity()
export class User {
 
    @PrimaryColumn()
    steamID: string;

    @Column()
    nickname: string;
 
    @Column()
    age: number;
 
    @OneToMany(type => Message, message => message.user)
    messages: Message[];
}