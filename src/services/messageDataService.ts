import { MessageModel } from "../schemas/messageSchema";


export class MessageDataService{

    async create(messageData) {
        return await MessageModel.create(messageData);
    }
}