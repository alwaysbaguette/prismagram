import middlewares from "../../../middlewares";
import { prisma } from "../../../generated/prisma-client";
import fragments from "../../fragments";

export default{
    Mutation:{
        sendMessage: async (_,args,{request})=>{
            middlewares.isAuthenticated(request);
            const { user } = request;
            const {roomId,message,toId} = args;
            let room;
            if(roomId === undefined){
                if(user.id !== toId){
                    room = await prisma.createRoom({
                        participants:{
                            connect:[{id:toId},{id:user.id}]    
                        }
                    }).$fragment(fragments.ROOM_FRAGMENT);
                }

            }else{
                room = await prisma.room({id:roomId}).$fragment(fragments.ROOM_FRAGMENT);    
            }
            if(!room) throw Error("Room not found");

            const getTo = room.participants.filter(participant =>participant.id !== user.id)[0];
            const msg = await prisma.createMessage({
                text: message,
                from : {
                    connect : { id : user.id}
                },
                to : {
                    connect : {
                        id:roomId ? getTo.id : toId
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });

            return msg;
        }
    }
}