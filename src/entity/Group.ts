import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Group extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.group, { eager: true })
  users: User;

  @Field(() => String, { nullable: true })
  @Column("longtext", { nullable: true })
  picture: string;

  @Field(() => String)
  @Column({ nullable: false, default: "" })
  about: string;
}
