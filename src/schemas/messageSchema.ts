import { Schema, model } from "mongoose";



const messageSchema = new Schema({
    sender_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    reciever_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    message: {
        type: String,
        required:true
    }
},
{
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey:false
})

export const MessageModel = model('Message',messageSchema,'messages')