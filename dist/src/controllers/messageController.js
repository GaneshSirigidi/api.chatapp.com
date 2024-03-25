"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const responseHelper_1 = require("../helpers/responseHelper");
const messageDataService_1 = require("../services/messageDataService");
const conversationDataService_1 = require("../services/conversationDataService");
const responseHelper = new responseHelper_1.ResponseHelper();
const messageDataService = new messageDataService_1.MessageDataService();
const conversationDataService = new conversationDataService_1.ConversationDataService();
class MessageController {
    sendMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let messageData = req.body;
                messageData.reciever_id = req.params.id;
                messageData.sender_id = req.user.id;
                let conversation = yield conversationDataService.getOne(req.user.id, req.params.id);
                if (!conversation) {
                    let participantsData = {
                        participants: [messageData.sender_id, messageData.reciever_id]
                    };
                    conversation = yield conversationDataService.create(participantsData);
                }
                const message = yield messageDataService.create(messageData);
                conversation.messages.push(message._id);
                conversation.save();
                return responseHelper.sendSuccessReponse(res, 201, 'Message sent successfully', message);
            }
            catch (err) {
                console.log(err);
                return responseHelper.sendErrorReponse(res, 500, err.message || "Internal Server Error!", err.errors);
            }
        });
    }
    getMessages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToChatId = req.params.id;
                const senderId = req.user.id;
                const conversation = yield conversationDataService.getOneWithPopulate(senderId, userToChatId);
                if (!conversation) {
                    return responseHelper.sendSuccessReponse(res, 200, 'Messages fetched successfully!', []);
                }
                return responseHelper.sendSuccessReponse(res, 200, 'Messages fetched successfully!', conversation.messages);
            }
            catch (err) {
                console.log(err);
                return responseHelper.sendErrorReponse(res, 500, err.message || "Internal Server Error!", err.errors);
            }
        });
    }
}
exports.MessageController = MessageController;
//# sourceMappingURL=messageController.js.map