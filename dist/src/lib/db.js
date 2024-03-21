"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../../config/app"));
if (!app_1.default.db.mongo_connection_string) {
    throw new Error("Please add the MONGO_URL environment variable");
}
mongoose_1.default.connect(app_1.default.db.mongo_connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const database = mongoose_1.default.connection;
database.on("error", console.error.bind(console, "❌ mongodb connection error"));
database.once("open", () => console.log("✅ mongodb connected successfully"));
mongoose_1.default.Promise = Promise;
exports.default = database;
//# sourceMappingURL=db.js.map