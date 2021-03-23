import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Rank } from "../entity/Rank";

@InputType()
class NewRank {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  picture: string;
}

@InputType()
class UpdateRank {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  picture: string;
}

@Resolver()
export default class RankResolver {
  @Query(() => Rank) async Rank(
    @Arg("id", () => Int, { nullable: true }) id: number
  ): Promise<Rank> {
    return await Rank.findOneOrFail({ id });
  }

  @Query(() => [Rank]) async Ranks(): Promise<Rank[]> {
    return await Rank.find();
  }

  @Mutation(() => Rank) async AddRank(
    @Arg("newRank", () => NewRank) newRank: NewRank
  ): Promise<Rank> {
    return await Rank.create(newRank).save();
  }

  @Mutation(() => Boolean) async DeleteRank(@Arg("id", () => Int) id: number) {
    Rank.delete({ id });
    return true;
  }

  @Mutation(() => Boolean) async UpdateRank(
    @Arg("id", () => Int) id: number,
    @Arg("updateRank", () => UpdateRank) updateRank: UpdateRank
  ) {
    Rank.update(id, updateRank);
    return true;
  }
}
