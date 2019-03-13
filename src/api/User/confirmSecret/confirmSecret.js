import { prisma } from "../../../../generated/prisma-client";
import utils from '../../../utils';

export default{
    Mutation:{
        confirmSecret : async (_,args) =>{
            const {email,secret} = args;
            const user = await prisma.user({email});
            
            console.log(user)
            if(user.loginSecret === secret){
                return utils.generateToken(user.id);
            }else{
                throw Error("Wrong email/secret combination");
            }
        }
    }
}