import middlewares from "../../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import fragments from "../../../fragments";

export default {
    Query : {
        seeRooms : (_,__,{request}) =>{
            middlewares.isAuthenticated(request);
            const {user} = request;
            return prisma.rooms({
                where:{
                    participants_some:{
                        id:user.id
                    }
                }
            }).$fragment(fragments.ROOM_FRAGMENT);
        }
    }
}