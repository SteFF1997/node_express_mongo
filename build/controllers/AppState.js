"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class AppStateController {
    constructor() {
        this.path = '/appstate/';
        this.router = express_1.default.Router();
        this.getHello = (request, response) => {
            console.warn('hello!');
            response.end();
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(`${this.path}getUsers`, this.getHello);
    }
}
exports.default = AppStateController;
