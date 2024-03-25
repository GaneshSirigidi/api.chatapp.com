"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const messageController_1 = require("../../controllers/messageController");
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const messageController = new messageController_1.MessageController();
const router = (0, express_1.Router)();
router.post('/send-messsage/:id', [
    authMiddleware.validateAccessToken
], messageController.sendMessage.bind(messageController));
exports.default = router;
//# sourceMappingURL=message.js.map