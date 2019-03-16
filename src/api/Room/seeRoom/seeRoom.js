import middlewares from "../../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import fragments from "../../../fragments";

export default {
    Query : {
        seeRoom : async (_,args,{request}) =>{
            middlewares.isAuthenticated(request);
            const {user} = request;
            const { id } = args;
            const canSee = await prisma.$exists.room({
                participants_some:{
                    id: user.id
                }
            });
            if(canSee){
                const room = await prisma.room({id}).$fragment(fragments.ROOM_FRAGMENT);
                return room; 
            }else{
                throw Error("You can't see this");
            }
        }
    }
}