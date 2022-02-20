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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
class RedisClient {
    constructor() {
        this.client = (0, redis_1.createClient)();
        this.init();
    }
    init() {
        this.client.once('error', (err) => console.log('Something Wrong! : ' + err));
        this.client.once('connect', () => console.log(`Successfully Connected to Redis!`));
    }
    get(field) {
        return __awaiter(this, void 0, void 0, function* () {
            if (field) {
                return yield this.client.get(field).catch((err) => Promise.reject('Something wrong! : ' + err));
            }
            return null;
        });
    }
    set(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (field && value) {
                return yield this.client.set(field, value);
            }
            return Promise.reject('field & value must not empty!');
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
        });
    }
}
exports.default = RedisClient;
