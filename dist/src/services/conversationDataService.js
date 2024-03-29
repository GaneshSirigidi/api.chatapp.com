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
exports.ConversationDataService = void 0;
const conversationSchema_1 = require("../schemas/conversationSchema");
class ConversationDataService {
    getOne(senderId, recieverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield conversationSchema_1.ConversationModel.findOne({ participants: { $all: [senderId, recieverId] } });
        });
    }
    create(conversationData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield conversationSchema_1.ConversationModel.create(conversationData);
        });
    }
    getOneWithPopulate(senderId, recieverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield conversationSchema_1.ConversationModel.findOne({ participants: { $all: [senderId, recieverId] } });
            if (!conversation) {
                // If no conversation found, return null or throw an error, depending on your use case
                return null;
            }
            // Populate the messages only if conversation exists
            return conversation.populate({ path: "messages" });
        });
    }
}
exports.ConversationDataService = ConversationDataService;
//# sourceMappingURL=conversationDataService.js.map