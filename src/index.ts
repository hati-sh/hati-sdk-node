import { Socket, createConnection, connect } from "net";

export enum StorageType {
  MEMORY = "memory",
  HDD = "hdd",
}

const OK = "+OK\n";
const ERROR = "+ERR\n";
const KEY_NOT_EXIST = "KEY_NOT_EXIST\n";

class HatiSdk {
  private options_: { host: string; port: number } = {
    host: "localhost",
    port: 4242,
  };

  private client_: Socket;

  constructor(options?: { host: string; port: number }) {
    if (options) {
      this.options_ = options;

      this.client_ = createConnection({
        host: options.host,
        port: options.port,
      });
    }
  }

  setOptions(options: { host: string; port: number }): void {
    this.options_ = options;
    this.client_ = createConnection({
      host: options.host,
      port: options.port,
    });
  }

  prepareCommand(payload: string): string {
    return `${payload}\n`;
  }

  async publish(command: string): Promise<string> {
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

  async set(
    key: string,
    value: string,
    storageType: StorageType = StorageType.MEMORY,
    ttl: number = 0
  ): Promise<boolean> {
    const payload = `SET ${storageType} ${ttl} ${key} ${value}`;

    const res = await this.publish(payload);
    if (res === OK) {
      return true;
    }

    return false;
  }

  async get(
    key: string,
    storageType: StorageType = StorageType.MEMORY
  ): Promise<string | null> {
    const payload = `GET ${storageType} ${key}`;

    const res = await this.publish(payload);
    if (res !== ERROR && res !== KEY_NOT_EXIST) {
      return res;
    }

    return null;
  }

  async has(
    key: string,
    storageType: StorageType = StorageType.MEMORY
  ): Promise<boolean> {
    const payload = `HAS ${storageType} ${key}`;

    const res = await this.publish(payload);
    if (res === OK) {
      return true;
    }

    return false;
  }

  async delete(
    key: string,
    storageType: StorageType = StorageType.MEMORY
  ): Promise<boolean> {
    const payload = `DELETE ${storageType} ${key}`;

    const res = await this.publish(payload);
    if (res === OK) {
      return true;
    }

    return false;
  }
}

export { HatiSdk };

export default HatiSdk;
