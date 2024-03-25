import { ConversationModel } from "../schemas/conversationSchema";


export class ConversationDataService{

    async getOne(senderId,recieverId) {
          return await ConversationModel.findOne({participants:{$all:[senderId,recieverId]}})
    }
    
    async create(conversationData) {
        return await ConversationModel.create(conversationData)
    }
    async getOneWithPopulate(senderId,recieverId) {
        return (await ConversationModel.findOne({ participants: { $all: [senderId, recieverId] } }))
            .populate({ path: "messages", select:'message'})
  }
}