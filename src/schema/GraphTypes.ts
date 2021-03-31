import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from "graphql";
import { User } from "../entity/User";
import { Group } from "../entity/Group";
import { Rank } from "../entity/Rank";

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    secname: { type: GraphQLString },
    isAdmin: { type: GraphQLString },
    password: { type: GraphQLString },
    picture: { type: GraphQLString },
    lastPictureUpdate:{type: GraphQLString},
    about: { type: GraphQLString },
    groupId: { type: GraphQLString }, 
    rankId: { type: GraphQLString },
    groupInfo: {
      type: GroupType,
    },
    rankInfo: {
      type: RankType,
    },
    birthday:{type: GraphQLString}
  }),
});

const GroupType: GraphQLObjectType = new GraphQLObjectType({
  name: "Group",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    picture: { type: GraphQLString },
    about: { type: GraphQLString },
    lastPictureUpdate:{type: GraphQLString},
    Users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        return await User.find({ groupId: parent.id });
      },
    },
  }),
});

const UserOnlyPicture = new GraphQLObjectType({
  name: "UserImgByGroupId",
  fields: () => ({
    id: { type: GraphQLID },
    picture: { type: GraphQLString },
  }),
});

const RankType = new GraphQLObjectType({
  name: "Rank",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    picture: { type: GraphQLString },
    Users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        return await User.find({ rank: parent.id });
      },
    },
  }),
});

const UserInput = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    secname: { type: GraphQLString },
    groupId: { type: GraphQLString },
    rankId: { type: GraphQLString },
    isAdmin: { type: GraphQLString },
    password: { type: GraphQLString },
    picture: { type: GraphQLString },
    about: { type: GraphQLString! },
  },
});

const GroupInput = new GraphQLInputObjectType({
  name: "GroupInput",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    picture: { type: GraphQLString },
    about: { type: GraphQLString },
  },
});

const RankInput = new GraphQLInputObjectType({
  name: "rankInput",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    picture: { type: GraphQLString },
  },
});

export {
  RankInput,
  GroupType,
  UserType,
  RankType,
  UserInput,
  GroupInput,
  UserOnlyPicture,
};
