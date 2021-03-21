import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

import {User} from "../entity/User";
import {Group} from "../entity/Group";
import {Rank} from "../entity/Rank";

import {  RankInput,  GroupInput, GroupType, RankType, UserType, UserInput,  } from "./GraphTypes";

const Mutations = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        AddGroup: {
            type: GroupType,
            args: {
                Group:{type:GroupInput}
            },
            async resolve(parent, args) {
                return await Group.create(args.Group as Group).save()
            }
        },
        AddUser: {
            type: UserType,
            args: {
                User: { type: UserInput }
            },
            async resolve(parent, args) {

                return await User.create(args.User as User).save()
            }
        },
        AddRank: {
            type: RankType,
            args: {
                Rank:{type:RankInput}
            },
            async resolve(parent, args) {
                return await Rank.create(args.Rank as Rank).save();
            }
        },
        UpdateRank:{
            type: RankType,
            args: { 
                Rank:{type:RankInput}
            },
            async resolve(parent, args) {
                
                let rank = args.Rank
                Object.keys(rank).forEach((key) => (rank[key] == null) && delete rank[key]);
                await Rank.update(rank.id, rank);
                return await Rank.findOne({id: rank.id}, {relations: ['group', 'rank']})
            }
        },
        UpdateGroup: {
            type: GroupType,
            args: { Group: {type: GroupInput} },
            async resolve(parent, args) {
                let group = args.Group
                Object.keys(group).forEach((key) => (group[key] == null) && delete group[key]);
                await Group.update(group.id, group);
                return await Rank.findOne({id: group.id}, {relations: ['group', 'rank']})
            }
        },
        UpdateUser: {
            type: UserType,
            args: {
                User: { type: UserInput }
            },
            async resolve(parent, args) {
                let user = args.User
                Object.keys(user).forEach((key) => (user[key] == null) && delete user[key]);
                await User.update(user.id, user);
                return await User.findOne({id: user.id});
            }
        }

    }
});

export { Mutations };