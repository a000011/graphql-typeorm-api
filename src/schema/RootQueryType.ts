import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLScalarType, GraphQLString } from "graphql";
import {User} from "../entity/User";
import {Group} from "../entity/Group";
import {Rank} from "../entity/Rank";
import { GroupType, UserType, RankType, UserOnlyPicture } from "./GraphTypes";

const RootQuery = new GraphQLObjectType({
    name: "Queries",
    fields: {
        Groups: {
            type: new GraphQLList(GroupType),
            async resolve() {
                return await Group.find();
            }
        },
        GroupById: {
            type: GroupType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                return await Group.findOne({id:args.id});
            }

        },       
        UsersImg:{
            type: new GraphQLList(UserOnlyPicture),
            args: { groupId:{type:GraphQLID}},
            async resolve(parent, args){
                //console.log(await User.find({groupId: args.groupId}))
                //let UsersIMg = await User.find({select:['id'], where:{groupId:args.groupId}})
                //console.log(UsersIMg)
                return await User.find({select:['id', 'picture'], where:{groupId:args.groupId}});
            }
        },
        Users: {
            type: new GraphQLList(UserType),
            async resolve() {
                return await User.find({relations: ['group', 'rank']});
            }
        },
        UserById: {
            type: UserType,
            args: {
                id:{type: GraphQLID}
            },
            async resolve(parent, args) {
                return await User.findOne({id:args.id});
            }
        },
        UserByGroupId: {
            type: new GraphQLList(UserType),
            args: {
                groupId:{type: GraphQLID}
            },
            async resolve(parent, args) {
                return await User.find({groupId:args.groupId});
            }
        },
        Ranks: {
            type: new GraphQLList(RankType),
            async resolve() {
                return await Rank.find();
            }

        },
        RankById: {
            type: RankType,
            args: {
                id:{type: GraphQLString}
            },
            async resolve(parent, args) {
                return await Rank.findOne({id:args.id}); 
            }
        },
    }
})

export { RootQuery };