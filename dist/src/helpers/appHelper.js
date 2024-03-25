"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAuthTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../../config/app"));
const getUserAuthTokens = function (userData) {
    let user = {
        id: userData._id,
        username: userData.username,
        email: userData.email,
    };
    let tokenSecret = app_1.default.jwt.token_secret + userData.password;
    let refreshTokenSecret = app_1.default.jwt.refresh_token_secret + userData.password;
    const token = jsonwebtoken_1.default.sign(user, tokenSecret, {
        expiresIn: app_1.default.jwt.token_life,
    });
    const refreshToken = jsonwebtoken_1.default.sign(user, refreshTokenSecret, {
        expiresIn: app_1.default.jwt.refresh_token_life,
    });
    return {
        token,
        refreshToken,
    };
};
exports.getUserAuthTokens = getUserAuthTokens;
//# sourceMappingURL=appHelper.js.map