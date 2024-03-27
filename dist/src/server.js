"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../config/app"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
require("./lib/db");
const app_2 = __importDefault(require("../config/app"));
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./socket/socket");
// view engine setup
socket_1.app.set('views', path_1.default.join(__dirname, 'views'));
socket_1.app.set('view engine', 'ejs');
socket_1.app.use((0, cors_1.default)());
socket_1.app.use((0, morgan_1.default)('dev'));
socket_1.app.use(express_1.default.json());
socket_1.app.use(express_1.default.urlencoded({ extended: false }));
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
socket_1.app.use('/' + app_2.default.app.api_version, index_1.default);
// catch 404 and forward to error handler
socket_1.app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
socket_1.app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
socket_1.server.listen(app_1.default.app.port, () => {
    console.log(`Server is running on port ${app_1.default.app.port}`);
});
//# sourceMappingURL=server.js.map