import { HatiSdk } from "../index";

console.log("@hatish/hati-sdk-node");

(async () => {
  const hati = new HatiSdk();

  const valueMsg = JSON.stringify({
    ok: true,
    dziala: "tak to dziala\nsuper sprawa",
  });

  // await hati.publish(`SET key ${valueMsg}`);
  await Promise.all([
    hati.publish(`SET test_key ${valueMsg}`),

    hati.publish(`GET test_key`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
    // hati.publish(`SET key ${valueMsg}`),
  ]);
})();
