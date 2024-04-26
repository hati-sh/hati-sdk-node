"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
console.log("@hatish/hati-sdk-node");
(async () => {
    const hati = new index_1.HatiSdk({
        host: "localhost",
        port: 4242,
    });
    const valueMsg = JSON.stringify({
        ok: true,
        dziala: "tak to dziala\nsuper sprawa",
    });
    const res = await hati.set("test_key", valueMsg, index_1.StorageType.MEMORY);
    console.log("res >>>> ", res);
    await hati.publish(`GET memory test_key`);
})();
//# sourceMappingURL=index.js.map