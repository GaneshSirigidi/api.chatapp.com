import { Request,Response,NextFunction } from 'express';
import { CustomError } from '../interfaces/customError';
import jwt from "jsonwebtoken";
import { UserDataService } from '../services/userDataService';
import configData from '../../config/app';

import { ResponseHelper } from '../helpers/responseHelper';

const userDataService = new UserDataService();
const responseHelper = new ResponseHelper()

export class AuthMiddleware {

    public async validateAccessToken(req: Request, res:Response,next:NextFunction) {
        try {
            const accessToken = req.headers.authorization || req.body.authorization;
            if (!accessToken) {
                return responseHelper.sendErrorReponse(res,401,"Unauthorized - No Token Provided")
              }
            // Decode JWT received via Header
            const userDetails = jwt.decode(accessToken);

            // Fetch User From DB
            const user: any = await userDataService.userById(userDetails.id);
            if (!user) {
                return responseHelper.sendErrorReponse(res,401,"Unauthorized - Invalid Access Token")
              }

            const tokenSecret = configData.jwt.token_secret + user.password;

            try {
                // Verify JWT
                jwt.verify(accessToken, tokenSecret);

                // Add User to the Request Payload
                req.user = user;
                next();
            } catch (error) {            
                return responseHelper.sendErrorReponse(res,401,error.message||'JWT vefrify error',error)
            }
        } catch (error) {
            return responseHelper.sendErrorReponse(res,401,"Invalid Access Token")
        }

    }
}

