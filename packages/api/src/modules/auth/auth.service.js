"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var sequelize_1 = require("@nestjs/sequelize");
var user_entity_1 = require("@api/modules/user/user.entity");
var AuthService = /** @class */ (function () {
    function AuthService(userModel) {
        this.userModel = userModel;
    }
    AuthService.prototype.signup = function (_a, userType) {
        var email = _a.email, password = _a.password, name = _a.name, phone = _a.phone;
        return __awaiter(this, void 0, void 0, function () {
            var user, hash, newUser, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({
                            where: { email: email }
                        })];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            throw new common_1.ConflictException();
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 2:
                        hash = _b.sent();
                        return [4 /*yield*/, this.userModel.create({
                                email: email,
                                password: hash,
                                name: name,
                                phone: phone,
                                user_type: 1
                            })];
                    case 3:
                        newUser = _b.sent();
                        return [4 /*yield*/, this.generateToken({ name: name, id: newUser.id })];
                    case 4:
                        token = _b.sent();
                        return [2 /*return*/, { token: token, user: { user_type: newUser.user_type } }];
                }
            });
        });
    };
    AuthService.prototype.signin = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var user, hashedPassword, isValidPassword, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({
                            where: { email: email }
                        })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new common_1.HttpException('Invalid Credentials 1', 400);
                        }
                        hashedPassword = user.password;
                        return [4 /*yield*/, bcrypt.compare(password, hashedPassword)];
                    case 2:
                        isValidPassword = _b.sent();
                        if (!isValidPassword) {
                            throw new common_1.HttpException('Invalid Credentials 2', 400);
                        }
                        return [4 /*yield*/, this.generateToken({ name: user.name, id: user.id })];
                    case 3:
                        token = _b.sent();
                        return [2 /*return*/, { token: token }];
                }
            });
        });
    };
    AuthService.prototype.generateToken = function (_a) {
        var name = _a.name, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, jwt.sign({ name: name, id: id }, process.env.JWT_SECRET, {
                        expiresIn: '155 days'
                    })];
            });
        });
    };
    AuthService.prototype.generateProductKey = function (_a) {
        var email = _a.email, userType = _a.userType;
        var key = process.env.PRODUCT_KEY_SECRET;
        var string = "".concat(email, "-").concat(userType, "-").concat(key);
        return bcrypt.hash(string, 10);
    };
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
