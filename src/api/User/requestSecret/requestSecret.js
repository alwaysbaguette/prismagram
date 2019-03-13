import utils from '../../../utils';
import words from '../../../words';
import {prisma} from '../../../../generated/prisma-client';

export default {
    Mutation:{
        requestSecret: async (_,args) =>{
            const {email} = args;
            const nouns = words.nouns;
            const adjectives = words.adjectives;
            const loginSecret = nouns[utils.generateRandomNo(nouns)] + adjectives[utils.generateRandomNo(adjectives)];
            try{
                await utils.sendSecretMail(email,loginSecret);
                await prisma.updateUser({data:{loginSecret},where:{email}});
                return true;
            }catch(err){
                console.log(err)
                return false;
            }
        }
    }
}