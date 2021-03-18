import {JoinColumn, BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Group} from "./Group";
import {Rank} from "./Rank";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    secname: string;
    
    @ManyToOne(() => Rank, {eager: true, nullable: false})
    @JoinColumn({name: "rankId"})
    rank: Rank;

    @Column({nullable: false})
    rankId: string;

    @Column({nullable: false})
    isAdmin: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: true})
    picture: string;

    @ManyToOne(() => Group,{eager: true})
    @JoinColumn({name: "groupId"})
    group: Group;

    @Column({nullable: false})
    groupId: string;

    @Column({nullable: false})
    about: string;
}

