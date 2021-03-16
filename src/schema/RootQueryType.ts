import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLScalarType, GraphQLString } from "graphql";
import {User} from "../entity/User";
import {Group} from "../entity/Group";
import {Rank} from "../entity/Rank";
import { GroupType, UserType, RankType } from "./GraphTypes";

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
                return Group.findOne({id:args.id})
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