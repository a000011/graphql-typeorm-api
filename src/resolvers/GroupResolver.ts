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

@InputType()
class NewGroup {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  picture: string;

  @Field(() => String, { nullable: true })
  about: string;

  @Field(() => String, { nullable: true })
  lastPictureUpdate: string;
}

@InputType()
class UpdateGroup {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  picture: string;

  @Field(() => String, { nullable: true })
  about: string;

  @Field(() => String, { nullable: true })
  lastPictureUpdate: string;
}

@Resolver()
export default class GroupResolver {
  @Query(() => Group) async Group(
    @Arg("id", () => Int, { nullable: true }) id: number
  ): Promise<Group> {
    return await Group.findOneOrFail({ id });
  }

  @Query(() => [Group]) async Groups(): Promise<Group[]> {
    return await Group.find();
  }

  @Mutation(() => Group) async AddGroup(
    @Arg("newGroup", () => NewGroup) newGroup: NewGroup
  ): Promise<Group> {
    newGroup.lastPictureUpdate = new Date().toISOString();
    return await Group.create(newGroup).save();
  }

  @Mutation(() => Boolean) async DeleteGroup(@Arg("id", () => Int) id: number) {
    Group.delete({ id });
    return true;
  }

  @Mutation(() => Boolean) async UpdateGroup(
    @Arg("id", () => Int) id: number,
    @Arg("updateGroup", () => UpdateGroup) updateGroup: UpdateGroup
  ) {
    if(updateGroup.picture != null){
      updateGroup.lastPictureUpdate = new Date().toISOString();
    }
    Group.update(id, updateGroup);
    return true;
  }
}
