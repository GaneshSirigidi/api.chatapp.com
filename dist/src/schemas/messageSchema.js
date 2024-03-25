"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    sender_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reciever_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey: false
});
exports.MessageModel = (0, mongoose_1.model)('Message', messageSchema, 'messages');
//# sourceMappingURL=messageSchema.js.map