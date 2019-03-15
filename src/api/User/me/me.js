import middlewares from "../../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import { LegacyRelationalReservedFields } from "prisma-datamodel";

export default {
    Query : {
        me: async (_,__,{request}) =>{
            middlewares.isAuthenticated(request);
            const {user} = request;
            const userResponse = await prisma.user({id:user.id});
            const posts = await prisma.user({id:user.id}).posts();

            return {
                user: userResponse,
                posts
            }
        }
    }
}