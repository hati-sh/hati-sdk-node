"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HatiSdk = exports.StorageType = void 0;
const net_1 = require("net");
var StorageType;
(function (StorageType) {
    StorageType["MEMORY"] = "memory";
    StorageType["HDD"] = "hdd";
})(StorageType || (exports.StorageType = StorageType = {}));
const OK = "+OK\n";
const ERROR = "+ERR\n";
const KEY_NOT_EXIST = "KEY_NOT_EXIST\n";
class HatiSdk {
    constructor(options) {
        this.options_ = {
            host: "localhost",
            port: 4242,
        };
        if (options) {
            this.options_ = options;
            this.client_ = (0, net_1.createConnection)({
                host: options.host,
                port: options.port,
            });
        }
    }
    setOptions(options) {
        this.options_ = options;
        this.client_ = (0, net_1.createConnection)({
            host: options.host,
            port: options.port,
        });
    }
    prepareCommand(payload) {
        return `${payload}\n`;
    }
    async publish(command) {
        return new Promise((resolve, reject) => {
            this.client_.write(this.prepareCommand(command));
            this.client_.on("data", (data) => {
                resolve(data.toString());
                if (data.toString().endsWith("EXIT\n")) {
                    this.client_.destroy();
                }
            });
            this.client_.on("error", (err) => {
                reject(err);
            });
        });
    }
    async set(key, value, storageType = StorageType.MEMORY, ttl = 0) {
        const payload = `SET ${storageType} ${ttl} ${key} ${value}`;
        const res = await this.publish(payload);
        if (res === OK) {
            return true;
        }
        return false;
    }
    async get(key, storageType = StorageType.MEMORY) {
        const payload = `GET ${storageType} ${key}`;
        const res = await this.publish(payload);
        if (res !== ERROR && res !== KEY_NOT_EXIST) {
            return res;
        }
        return null;
    }
    async has(key, storageType = StorageType.MEMORY) {
        const payload = `HAS ${storageType} ${key}`;
        const res = await this.publish(payload);
        if (res === OK) {
            return true;
        }
        return false;
    }
    async delete(key, storageType = StorageType.MEMORY) {
        const payload = `DELETE ${storageType} ${key}`;
        const res = await this.publish(payload);
        if (res === OK) {
            return true;
        }
        return false;
    }
}
exports.HatiSdk = HatiSdk;
exports.default = HatiSdk;
//# sourceMappingURL=index.js.map