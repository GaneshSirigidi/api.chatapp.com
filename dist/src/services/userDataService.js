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
exports.UserDataService = void 0;
const userSchema_1 = require("../schemas/userSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 12;
class UserDataService {
    saveUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            userData.password = yield bcrypt_1.default.hash(userData.password, saltRounds);
            return yield userSchema_1.UserModel.create(userData);
        });
    }
    findOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userSchema_1.UserModel.findOne({ email: email });
        });
    }
    userById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userSchema_1.UserModel.findById(id);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userSchema_1.UserModel.find({});
        });
    }
}
exports.UserDataService = UserDataService;
//# sourceMappingURL=userDataService.js.map