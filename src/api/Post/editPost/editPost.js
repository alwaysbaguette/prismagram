import middlewares from "../../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";
export default {
    Mutation:{
        editPost: async (_,args,{request}) =>{
            middlewares.isAuthenticated(request);
            const {id,caption,location,action} = args;
            const {user} = request;
            try{
                const post = await prisma.$exists.post({id,user:{id:user.id}});

                if(!post){
                    return false;
                }else{
                    if(action === EDIT){

                        await prisma.updatePost({
                            where:{
                                id
                            },
                            data:{
                                caption,
                                location
                            }
                        });

                    }else if(action === DELETE){
                        await prisma.deletePost({id});
                    }
                    return true;
                }
            }catch(error){
                console.log(error);
                return false;
                
            }
        }
    }
}