import { ResponseHelper } from "../helpers/responseHelper";
import { Response, Request, NextFunction } from "express";
import { MessageDataService } from "../services/messageDataService";
import { ConversationDataService } from "../services/conversationDataService";

const responseHelper = new ResponseHelper();
const messageDataService = new MessageDataService();
const conversationDataService = new ConversationDataService();

export class MessageController {

    public async sendMessage(req: Request, res: Response, next: NextFunction) {
        try {

            let messageData = req.body;
            messageData.reciever_id = req.params.id;
            messageData.sender_id = req.user.id;

            let conversation = await conversationDataService.getOne(req.user.id, req.params.id);
            if (!conversation) {
                let participantsData = {
                    participants:[messageData.sender_id,messageData.reciever_id]
                } 
                conversation = await conversationDataService.create(participantsData);
            }


            const message = await messageDataService.create(messageData);

            conversation.messages.push(message._id);
            conversation.save();

            return responseHelper.sendSuccessReponse(res, 201, 'Message sent successfully',message)


        } catch (err) {
            console.log(err)
            return responseHelper.sendErrorReponse(res, 500, err.message || "Internal Server Error!", err.errors);
        }
    }

    public async getMessages(req:Request,res:Response,next:NextFunction) {
        try {
            
            const userToChatId = req.params.id;
            const senderId = req.user.id;

            const conversation = await conversationDataService.getOneWithPopulate(senderId, userToChatId);

            return responseHelper.sendSuccessReponse(res, 201, 'Messages fetched successfully!',conversation)


        } catch (err) {
            console.log(err)
            return responseHelper.sendErrorReponse(res, 500, err.message || "Internal Server Error!", err.errors);
        }
    }


}