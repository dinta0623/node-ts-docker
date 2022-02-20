"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const redis_1 = __importDefault(require("./redis"));
const app = (0, express_1.default)();
const port = 8080;
const redis = new redis_1.default();
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield redis.connect();
        console.log('😎 ok');
    });
}());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/set/:field/:value', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis.set(req.params.field, req.params.value);
    return res.json({
        status: 200,
        message: `Successfully adding ${req.params.field}`
    });
}));
app.get('/get/:field/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = redis.get(req.params.field);
    return res.json({
        status: 200,
        message: `Successfully requesting ${req.params.field}`,
        result: result || null
    });
}));
app.listen(port, () => console.log('running well!'));
