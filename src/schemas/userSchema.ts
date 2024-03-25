import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required : true
    },
    username: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum:["Male","Female"]
    },
    profile_pic: {
        type: String,
        default:""
    }
},
{
    timestamps: {
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    },
    versionKey:false
})

export const UserModel = model('User',userSchema,'users')