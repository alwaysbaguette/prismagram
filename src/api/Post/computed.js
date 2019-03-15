import {prisma} from '../../../generated/prisma-client';

export default{
    Post:{
        isLiked: (parent,__,{request}) =>{
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.like({
                AND:[
                    {
                        user:{
                            id:user.id
                        }
                    },
                    {
                        post:{
                            id
                        }
                    }
                ]
            });
        },
        likeCount: async (parent) =>{
            const likeCount = await prisma.likesConnection({
                where:{
                    post:{
                        id: parent.id
                    }
                }
            })
            .aggregate()
            .count();

            return likeCount
        }
    }
}