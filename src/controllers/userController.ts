import { Request, Response, NextFunction } from "express";

import { UserDataService } from "../services/userDataService";
const userDataService = new UserDataService()

export class UserController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {

            const userData = req.body;

            const user = await userDataService.findOne(userData.username);
            if (user) {
                return res.status(400).json({
                    success: false,
                    message:"Username already exists"
                })
            }

            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userData.username}`
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userData.username}`

            userData.profile_pic = userData.gender === 'Male' ? boyProfilePic : girlProfilePic
            
            await userDataService.saveUser(userData);

            return res.status(201).json({
                success: true,
                message: "User Registered  Successfully!",
            });

        } catch (err) {
            next(err);
        }
    }
}