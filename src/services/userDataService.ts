import { UserModel } from "../schemas/userSchema";
import bcrypt from "bcrypt";


const saltRounds = 12;
export class UserDataService{
    async saveUser(userData) {
        userData.password = await bcrypt.hash(userData.password, saltRounds);
        return await UserModel.create(userData)
    }
    async findOne(email:string) {
        return await UserModel.findOne({email:email})
    }
    async userById(id:string) {
        return await UserModel.findById(id);
    }

    async getUsers(loginUserId) {
        return await UserModel.find({_id:{$ne:loginUserId}})
    }
}