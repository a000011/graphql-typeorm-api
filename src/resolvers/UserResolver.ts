import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Group } from "../entity/Group";
import { Rank } from "../entity/Rank";
import { User } from "../entity/User";

@InputType()
class NewUser {
  @Field(() => String, { nullable: true })
  rank: Rank;

  @Field(() => String, { nullable: true })
  group: Group;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  secname: string;

  @Field(() => String, { nullable: true })
  picture: string;

  @Field(() => String, { nullable: true })
  about: string;
}

@InputType()
class UpdateUser {
  @Field(() => Int, { nullable: true })
  rankId: number;

  @Field(() => Int, { nullable: true })
  groupId: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  secname: string;

  @Field(() => String, { nullable: true })
  picture: string;

  @Field(() => String, { nullable: true })
  about: string;
}

@Resolver()
export default class UserResolver {
  @Query(() => User) async User(
    @Arg("id", () => Int, { nullable: true }) id: number
  ): Promise<User> {
    return await User.findOneOrFail({ id });
  }

  @Query(() => [User]) async Users(): Promise<User[]> {
    return await User.find();
  }

  @Mutation(() => User) async AddUser(
    @Arg("newUser", () => NewUser) newUser: NewUser
  ): Promise<User> {
    return await User.create(newUser).save();
  }

  @Mutation(() => Boolean) async DeleteUser(@Arg("id", () => Int) id: number) {
    User.delete({ id });
    return true;
  }

  @Mutation(() => Boolean) async UpdateUser(
    @Arg("id", () => Int) id: number,
    @Arg("updateUser", () => UpdateUser) updateUser: UpdateUser
  ) {
    User.update(id, updateUser);
    return true;
  }
}
