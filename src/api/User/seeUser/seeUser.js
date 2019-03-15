import middlewares from "../../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Query : {
        seeUser : (_,args,{request}) =>{
            middlewares.isAuthenticated(request);
            const {id} = args;
            return prisma.user({id})
            
        }
    }
}