import { GraphQLInputObjectType, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLList } from "graphql";
import {User} from "../entity/User";
import {Group} from "../entity/Group";
import {Rank} from "../entity/Rank";


const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        secname: { type: GraphQLString },
        isAdmin: { type: GraphQLString },
        password: { type: GraphQLString },
        picture: { type: GraphQLString },
        about: { type: GraphQLString },
        groupInfo: {
            type: GroupType,
            async resolve(parent, args) {
                return await Group.findOne({id: parent.group.id});
            }
        },
        rankInfo: {
            type: RankType,
            async resolve(parent, args) {
                return await Rank.findOne({id: parent.rank.id});
            }
        }
    })
})

const GroupType: GraphQLObjectType = new GraphQLObjectType({
    name: "Group",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        picture: { type: GraphQLString },
        about: { type: GraphQLString },
        Users: {
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                return await User.find({group:parent.id});
            }
        }

    })
})

const RankType: GraphQLObjectType = new GraphQLObjectType({
    name: "Rank",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        picture: { type: GraphQLString },
        Users: {
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                return await User.find({rank:parent.id})
            }
        }

    })
})

const UserInput = new GraphQLInputObjectType({
    name: "UserInput",
    fields:{
        id:{type: GraphQLID},
        name: { type: GraphQLString },
        secname: { type: GraphQLString },
        group: { type: GraphQLString },
        rank: { type: GraphQLString },
        isAdmin: { type: GraphQLString },
        password: { type: GraphQLString },
        picture: { type: GraphQLString },
        about: { type: GraphQLString }
    }
})

const GroupInput = new GraphQLInputObjectType({
    name: "GroupInput",
    fields:{
        id:{type: GraphQLID},
        name: { type: GraphQLString },
        picture: { type: GraphQLString },
        about: { type: GraphQLString }
    }
})

const RankInput = new GraphQLInputObjectType({
    name: "rankInput",
    fields:{
        id:{type: GraphQLID},
        name: { type: GraphQLString },
        picture: { type: GraphQLString }
    }
})

export {  RankInput, GroupType, UserType, RankType, UserInput, GroupInput };

// Users{
//     name
//     secname
//     groupInfo{
//       id
//       name
//       picture
//     }
//     rankInfo{
//       name
//       picture
//     }
//   }
// }