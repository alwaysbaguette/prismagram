import middlewares from "../../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation :{
        editUser : (_,args,{request})=>{
            middlewares.isAuthenticated(request);
            const {userName,email,firstName,lastName,bio} = args;
            const {user} =request;
            return prisma.updateUser({
                where : {
                    id: user.id
                },
                data : {
                    userName,
                    email,
                    firstName,
                    lastName,
                    bio
                }
            })
        }
    }
}

// return 프로미스를 바로 리턴 하면 async await 안써도된다.