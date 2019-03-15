import middlewares from "../../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import Fragment from "../../../fragments";

export default {
    Query : {
        me: (_,__,{request}) =>{
            middlewares.isAuthenticated(request);
            const {user} = request;
            const USER_FRAGMENT = Fragment.USER_FRAGMENT;
            return prisma.user({id:user.id}).$fragment(USER_FRAGMENT);

        }
    }
}