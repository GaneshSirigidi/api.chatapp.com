"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModel = void 0;
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    participants: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]
}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey: false
});
exports.ConversationModel = (0, mongoose_1.model)('Conversation', conversationSchema, 'conversations');
//# sourceMappingURL=conversationSchema.js.map