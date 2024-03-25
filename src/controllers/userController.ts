import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { UserDataService } from "../services/userDataService";
import { ResponseHelper } from "../helpers/responseHelper";
import { getUserAuthTokens } from "../helpers/appHelper";


const userDataService = new UserDataService()
const responseHelper = new ResponseHelper()

export class UserController {
    public async signUp(req: Request, res: Response) {
        try {

            const userData = req.body;

            const user = await userDataService.findOne(userData.email);
            if (user) {
                return responseHelper.sendErrorReponse(res, 409, "Username already exists");
            }

            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userData.username}`
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userData.username}`

            userData.profile_pic = userData.gender === 'Male' ? boyProfilePic : girlProfilePic

            await userDataService.saveUser(userData);

            return responseHelper.sendSuccessReponse(res, 201, "User Registered  Successfully!");

        } catch (err) {
            console.log(err)
            return responseHelper.sendErrorReponse(res, 500, err.message || "Internal Server Error!", err.errors);
        }
    }

    public async signIn(req: Request, res: Response) {
        try {

            const userData = req.body;
            const user = await userDataService.findOne(userData.email);
            if (!user) {
                return responseHelper.sendErrorReponse(res, 401, "Invalid Credentials");
            }

            const matchedPassword = await bcrypt.compare(userData.password, user.password)
            if (!matchedPassword) {
                return responseHelper.sendErrorReponse(res, 401, "Invalid Credentials");
            }

            const { token, refreshToken } = await getUserAuthTokens(user);

            user.password = undefined;

            let responseData = {
                user_details: user,
                access_token:token,
                refresh_token:refreshToken
            }

            return responseHelper.sendSuccessReponse(res,200,"User signin successfully!",responseData)

        } catch (err) {
            console.log(err)
            return responseHelper.sendErrorReponse(res, 500, err.message || "Internal Server Error!", err.errors);
        }
    }

    public async listUsers(req:Request,res:Response) {
        try {

            const users = await userDataService.getUsers();
            return responseHelper.sendSuccessReponse(res,200,"Users fetched successfully!",users)
            
        } catch (err) {
            console.log(err)
            return responseHelper.sendErrorReponse(res, 500, err.message || "Internal Server Error!", err.errors);
        }
    }
}