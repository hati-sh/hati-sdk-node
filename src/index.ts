import { Socket, createConnection, connect } from "net";

const version = "01";
const hatiHeader = "++hati";

const extraSpaceArray = new Array(4);
const extraSpace = Buffer.from(extraSpaceArray);

class HatiSdk {
  private static options_: { host: string; port: number } = {
    host: "localhost",
    port: 4242,
  };

  private static client_: Socket;

  constructor(options?: { host: string; port: number }) {
    if (options) {
      HatiSdk.options_ = options;

      HatiSdk.client_ = createConnection({
        host: options.host,
        port: options.port,
      });
    }
  }

  static setOptions(options: { host: string; port: number }): void {
    HatiSdk.options_ = options;

    HatiSdk.client_ = createConnection({
      host: options.host,
      port: options.port,
    });
  }

  prepareMessage(payload: string): string {
    return `${payload}\n`;
  }

  async publish(message: string): Promise<any> {
    return new Promise((resolve, reject) => {
      HatiSdk.client_.write(this.prepareMessage(message));

      HatiSdk.client_.on("data", (data) => {
        resolve(data.toString());
        if (data.toString().endsWith("EXIT")) {
          HatiSdk.client_.destroy();
        }
      });

      HatiSdk.client_.on("error", (err) => {
        reject(err);
      });
    });
    // let okCount = 0;
    // let receivedCount = 0;

    // const maxCount = 100000;
    // const startTime: any = new Date();

    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // for (let i = 0; i < maxCount; i++) {
    //   await delay(1 / 600);

    //   // setImmediate(() => {
    //   const msg = this.prepareMessage(message);
    //   // run something
    //   const ok = client.write(`${msg}`, (err) => {
    //     if (err) {
    //       console.error("error: ", err);
    //     }
    //   });

    //   if (ok) {
    //     okCount++;
    //   } else {
    //     // client.pause();
    //   }
    //   // });
    // }

    // const endTime: any = new Date();
    // const timeElapsed: any = endTime - startTime;

    // console.log("timeElapsed: ", timeElapsed);
    // console.log("okCount: ", okCount);

    // var okBuffer = Buffer.from("+OK\n");

    // client.on("data", function (data) {
    //   // console.log(data.toString());

    //   if (Buffer.compare(data, okBuffer) === 0) {
    //     // console.log("ok");
    //     return;
    //   } else {
    //     // console.log("err: ", data.toString());
    //   }

    //   // var is_kernel_buffer_full = client.write(data);
    //   // if (!is_kernel_buffer_full) {
    //   //   client.pause();
    //   // }
    //   // if (is_kernel_buffer_full) {
    //   //   console.log(
    //   //     "Data was flushed successfully from kernel buffer i.e written successfully!"
    //   //   );
    //   // } else {
    //   //   client.pause();
    //   // }
    //   // receivedCount++;
    //   // client.destroy(); // kill client after server's response
    //   // console.log("Received: " + data);
    //   // if (maxCount === receivedCount) {
    //   //   console.log("YESSSSSSSSS");
    //   // } else {
    //   //   console.log(receivedCount);
    //   // }
    // });

    // client.on("close", function () {
    //   console.log("Connection closed");
    // });

    // client.on("timeout", function () {
    //   console.log("Socket timed out !");
    //   client.end("Timed out!");
    //   // can call socket.destroy() here too.
    // });

    // client.on("drain", function () {
    //   console.log(
    //     "write buffer is empty now .. u can resume the writable stream"
    //   );
    //   client.resume();
    // });
  }
}

export { HatiSdk };

export default HatiSdk;
