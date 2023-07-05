"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
// import { HomeModule } from './modules/home/home.module';
var core_1 = require("@nestjs/core");
var user_interceptor_1 = require("./modules/user/interceptors/user.interceptor");
var auth_guard_1 = require("./modules/guards/auth.guard");
var config_1 = require("@nestjs/config");
var database_module_1 = require("@database/database.module");
var _config_1 = require("@config");
var test_module_1 = require("@api/modules/test/test.module");
var user_module_1 = require("@api/modules/user/user.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({ isGlobal: true, load: [_config_1.config] }),
                database_module_1.DatabaseModule,
                test_module_1.TestModule,
                user_module_1.UserModule,
                // HomeModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: user_interceptor_1.UserInterceptor
                },
                { provide: core_1.APP_GUARD, useClass: auth_guard_1.AuthGuard },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
