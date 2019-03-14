import middlewares from '../../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation : {
        toggleLike : async (_,args,{request}) => {
            middlewares.isAuthenticated(request);
            const { postId } = args;
            const { user } = request;
            const filterOption ={
                AND:[
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            };

            try{ 
                const existingLike = await prisma.$exists.like(filterOption);
                
                if(existingLike){
                    await prisma.deleteManyLikes(filterOption);
                }else{
                    const newLike = await prisma.createLike({
                        user:{
                            connect:{
                                id:user.id
                            }
                        },
                        post: {
                            connect : {
                                id: postId
                            }
                        }
                    });
                };

                return true;
            }
            catch(err){
                return false;
            }
        }
    }
}