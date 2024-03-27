import { ConversationModel } from "../schemas/conversationSchema";


export class ConversationDataService{

    async getOne(senderId,recieverId) {
          return await ConversationModel.findOne({participants:{$all:[senderId,recieverId]}})
    }
    
    async create(conversationData) {
        return await ConversationModel.create(conversationData)
    }
    async getOneWithPopulate(senderId,recieverId) {
        const conversation = await ConversationModel.findOne({ participants: { $all: [senderId, recieverId] } });
        if (!conversation) {
            // If no conversation found, return null or throw an error, depending on your use case
            return null;
        } 
        // Populate the messages only if conversation exists
        return conversation.populate({ path: "messages" })
  }
}