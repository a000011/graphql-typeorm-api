import { Field, Int, ObjectType } from "type-graphql";
import {
  JoinColumn,
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Group } from "./Group";
import { Rank } from "./Rank";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({})
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  rankId: number;

  @ManyToOne(() => Rank, { eager: true, nullable: false })
  @JoinColumn({ name: "rankId" })
  rank: Rank;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  groupId: number;

  @ManyToOne(() => Group, (group) => group.users)
  @JoinColumn({ name: "groupId" })
  group: Group;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  secname: string;

  @Field(() => String, { nullable: true })
  @Column("longtext", { nullable: true })
  picture: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: false, default: "" })
  about: string;
}
