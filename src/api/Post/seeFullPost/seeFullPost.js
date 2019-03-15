import { prisma } from "../../../../generated/prisma-client";
import fragment from '../../../fragments';

export default {
    Query : {
        seeFullPost : async (_,args) =>{
            const {id} = args;
            const post = await prisma.post({id});
            const comments = await prisma.post({id}).comments().$fragment(fragment.COMMENT_FRAGMENT);
            const likeCount = await prisma.likesConnection({
                where:{
                    post:{
                        id
                    }
                }
            })
            .aggregate()
            .count();

            return {
                post,
                comments,
                likeCount
            }
        }
    }
}