"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    sendSuccessReponse(res, status, message = "", data = []) {
        let responseBody = {
            success: true,
            message,
            status: status,
            data
        };
        return res.status(status).json(responseBody);
    }
    sendErrorReponse(res, status, message = "", errors = {}, data = []) {
        let responseBody = {
            success: false,
            message,
            status: status,
            errors,
            data
        };
        return res.status(status).json(responseBody);
    }
}
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=responseHelper.js.map