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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userDataService_1 = require("../services/userDataService");
const userDataService = new userDataService_1.UserDataService();
class UserController {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const user = yield userDataService.findOne(userData.username);
                if (user) {
                    return res.status(400).json({
                        success: false,
                        message: "Username already exists"
                    });
                }
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userData.username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userData.username}`;
                userData.profile_pic = userData.gender === 'Male' ? boyProfilePic : girlProfilePic;
                yield userDataService.saveUser(userData);
                return res.status(201).json({
                    success: true,
                    message: "User Registered  Successfully!",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map