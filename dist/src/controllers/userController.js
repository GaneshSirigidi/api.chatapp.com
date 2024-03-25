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
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDataService_1 = require("../services/userDataService");
const responseHelper_1 = require("../helpers/responseHelper");
const appHelper_1 = require("../helpers/appHelper");
const userDataService = new userDataService_1.UserDataService();
const responseHelper = new responseHelper_1.ResponseHelper();
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const user = yield userDataService.findOne(userData.email);
                if (user) {
                    return responseHelper.sendErrorReponse(res, 409, "Username already exists");
                }
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userData.username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userData.username}`;
                userData.profile_pic = userData.gender === 'Male' ? boyProfilePic : girlProfilePic;
                yield userDataService.saveUser(userData);
                return responseHelper.sendSuccessReponse(res, 201, "User Registered  Successfully!");
            }
            catch (err) {
                console.log(err);
                return responseHelper.sendErrorReponse(res, 500, err.message || "Internal Server Error!", err.errors);
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const user = yield userDataService.findOne(userData.email);
                if (!user) {
                    return responseHelper.sendErrorReponse(res, 401, "Invalid Credentials");
                }
                const matchedPassword = yield bcrypt_1.default.compare(userData.password, user.password);
                if (!matchedPassword) {
                    return responseHelper.sendErrorReponse(res, 401, "Invalid Credentials");
                }
                const { token, refreshToken } = yield (0, appHelper_1.getUserAuthTokens)(user);
                user.password = undefined;
                let responseData = {
                    user_details: user,
                    access_token: token,
                    refresh_token: refreshToken
                };
                return responseHelper.sendSuccessReponse(res, 200, "User signin successfully!", responseData);
            }
            catch (err) {
                console.log(err);
                return responseHelper.sendErrorReponse(res, 500, err.message || "Internal Server Error!", err.errors);
            }
        });
    }
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userDataService.getUsers();
                return responseHelper.sendSuccessReponse(res, 200, "Users fetched successfully!", users);
            }
            catch (err) {
                console.log(err);
                return responseHelper.sendErrorReponse(res, 500, err.message || "Internal Server Error!", err.errors);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map