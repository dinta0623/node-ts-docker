"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8080;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/:id', (req, res) => {
    var _a;
    res.send('Hello World : ' + ((_a = req.params) === null || _a === void 0 ? void 0 : _a.id));
});
app.listen(port, () => console.log('running well!'));
