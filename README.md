# @hatish/hati-sdk-node

Node.js SDK for communication with [Hati](https://github.com/hati-sh/hati) server.

## Installation

```
npm install --save @hatish/hati
```

## Usage

```ts
const hati = new HatiSdk({
  host: "localhost",
  port: 4242,
});

const value = JSON.stringify({
  ok: true,
  data: {
    name: "Jhon",
    lastname: "Doe",
    description: "Great person!\nFriendly foe.",
  },
});

const res = await hati.set(`jhon`, value, StorageType.MEMORY);
if (res === true) {
  console.log("ok");
}

const resValue = await hati.get(`jhon`, StorageType.MEMORY);
if (resValue !== null) {
  console.log(resValue);
}

const resHas = await hati.has(`jhon`, StorageType.MEMORY);
if (resHas === true) {
  console.log("key exist");
}

const resDelete = await hati.delete(`jhon`, StorageType.MEMORY);
if (resDelete === true) {
  console.log("key deleted");
}

/// Set key with TTL (in ms) value
const resWithTtl = await hati.set(`jhon`, value, StorageType.MEMORY, 10000);
if (resWithTtl === true) {
  console.log("ok");
}
```
