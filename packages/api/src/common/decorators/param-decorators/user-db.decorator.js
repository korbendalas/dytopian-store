"use strict";
exports.__esModule = true;
exports.CurrentUser = void 0;
var common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)(function (data, context) {
    //context is Same thing as in interceptor
    var req = context.switchToHttp().getRequest();
    return req.user;
});
