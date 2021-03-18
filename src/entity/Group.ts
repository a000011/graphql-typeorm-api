import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Group extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    picture: string;

    @Column({nullable: false})
    about: string;

}
//пример запроса

// mutation($Group: GroupInput){
//     AddGroup(Group: $Group){
//       name
//     }
//   }
//   {
//     "Group": {
//       "id": "2",
//       "name": "vp-21",
//       "picture": "=)",
//       "about": "yeah"
//     }
//   }