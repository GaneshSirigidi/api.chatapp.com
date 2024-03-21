import { UserModel } from "../schemas/userSchema";
import bcrypt from "bcrypt";


const saltRounds = 12;
export class UserDataService{
    async saveUser(userData) {
        userData.password = await bcrypt.hash(userData.password, saltRounds);
        return await UserModel.create(userData)
    }
    async findOne(username:string) {
        return await UserModel.findOne({username:username})
    }
}