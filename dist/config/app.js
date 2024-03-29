"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// load the correct env file based on the NODE_ENV value passed during the npm command
dotenv_1.default.config({ path: '.env' });
// set up data
const appData = {
    port: process.env.PORT,
    api_version: process.env.API_VERSION,
};
const DB = {
    mongo_connection_string: process.env.MONGO_URL,
};
const AWS = {
    s3_access_key_id: process.env.AWS_S3_ACCESS_KEY_ID,
    s3_secret_access_key: process.env.AWS_S3_SECRET_ACCESS_KEY,
    s3_bucket: process.env.AWS_S3_BUCKET,
    s3_bucket_region: process.env.AWS_S3_BUCKET_REGION,
    s3_base_url: process.env.S3_BASE_URL,
    pre_signed_url_expires: 3600, // sec
};
var JWTData = {
    token_secret: process.env.TOKEN_SECRET,
    token_life: parseInt(process.env.TOKEN_LIFE, 10),
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_life: parseInt(process.env.TOKEN_LIFE, 10), // 6 months
};
const configData = {
    app: appData,
    db: DB,
    jwt: JWTData,
    aws: AWS,
};
exports.default = configData;
//# sourceMappingURL=app.js.map