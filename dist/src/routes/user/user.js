"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/userController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const userController = new userController_1.UserController();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const router = (0, express_1.Router)();
router.post('/users/signup', userController.signUp.bind(userController));
router.post('/users/signin', userController.signIn.bind(userController));
router.get('/users', [
    authMiddleware.validateAccessToken
], userController.listUsers.bind(userController));
exports.default = router;
//# sourceMappingURL=user.js.map