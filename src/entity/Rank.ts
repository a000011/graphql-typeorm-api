import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Rank extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column("longtext", { nullable: true })
  picture: string;
}
