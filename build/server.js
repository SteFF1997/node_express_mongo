"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const app_1 = __importDefault(require("./app"));
const AppState_1 = __importDefault(require("./controllers/AppState"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const app = new app_1.default({
    port: 5000,
    controllers: [
        new AppState_1.default()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        logger_1.default
    ]
});
app.listen();
