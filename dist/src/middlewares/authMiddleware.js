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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userDataService_1 = require("../services/userDataService");
const app_1 = __importDefault(require("../../config/app"));
const responseHelper_1 = require("../helpers/responseHelper");
const userDataService = new userDataService_1.UserDataService();
const responseHelper = new responseHelper_1.ResponseHelper();
class AuthMiddleware {
    validateAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = req.headers.authorization || req.body.authorization;
                if (!accessToken) {
                    return responseHelper.sendErrorReponse(res, 401, "Unauthorized - No Token Provided");
                }
                // Decode JWT received via Header
                const userDetails = jsonwebtoken_1.default.decode(accessToken);
                // Fetch User From DB
                const user = yield userDataService.userById(userDetails.id);
                if (!user) {
                    return responseHelper.sendErrorReponse(res, 401, "Unauthorized - Invalid Access Token");
                }
                const tokenSecret = app_1.default.jwt.token_secret + user.password;
                try {
                    // Verify JWT
                    jsonwebtoken_1.default.verify(accessToken, tokenSecret);
                    // Add User to the Request Payload
                    req.user = user;
                    next();
                }
                catch (error) {
                    return responseHelper.sendErrorReponse(res, 401, error.message || 'JWT vefrify error', error);
                }
            }
            catch (error) {
                return responseHelper.sendErrorReponse(res, 401, "Invalid Access Token");
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map