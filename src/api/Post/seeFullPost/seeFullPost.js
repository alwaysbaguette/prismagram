import { prisma } from "../../../../generated/prisma-client";
import  fragments from '../../../fragments';

export default {
    Query : {
        seeFullPost : async (_,args) =>{
            const {id} = args;
            const post = await prisma.post({id});
            return post;
        }
    }
}