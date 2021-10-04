import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService{
    async execute({ user_sender, user_receiver, tag_id, message }: IComplimentRequest){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);
        if(user_receiver === user_sender){
            throw new Error("Incorrect User Receiver");
        }
        const userReceiverExixts = await usersRepositories.findOne(user_receiver);
        if(!userReceiverExixts){
            throw new Error("User Receiver does not exists!");
        }
        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message,
        });
        await complimentsRepositories.save(compliment);
        return compliment;
    }
}

export { CreateComplimentService }