import { Socket, createConnection, connect } from "net";

const version = "01";
const hatiHeader = "++hati";

const extraSpaceArray = new Array(4);
const extraSpace = Buffer.from(extraSpaceArray);

class HatiSdk {
  private static options_: any;

  constructor(options?: any) {
    if (options) {
      HatiSdk.options_ = options;
    }
  }

  static setOptions(options: any): void {
    HatiSdk.options_ = options;
  }

  prepareMessage(payload: string): string {
    // let preparedMessage = `${hatiHeader}${version}${extraSpace}CL:${payload.length}\n${payload}EOP\n--hati\n\r`;
    let preparedMessage = `${payload}\n`;

    return preparedMessage;
  }

  async publish(message: string): Promise<any> {
    const client = createConnection({
      host: "localhost",
      port: 4242,
      // host: "roundhouse.proxy.rlwy.net",
      // port: 11402,
      // host: "monorail.proxy.rlwy.net",
      // port: 17092,
    });
    // client.setNoDelay();

    let okCount = 0;
    let receivedCount = 0;

    const maxCount = 1;
    const startTime: any = new Date();

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < maxCount; i++) {
      await delay(1 / 200); // 1000 = 1s

      // setImmediate(() => {
      const msg = this.prepareMessage(message);
      // run something
      const ok = client.write(`${msg}`, (err) => {
        if (err) {
          console.error("error: ", err);
        }
      });

      if (ok) {
        okCount++;
      } else {
        // client.pause();
      }
      // });
    }

    const endTime: any = new Date();
    const timeElapsed: any = endTime - startTime;

    console.log("timeElapsed: ", timeElapsed);
    console.log("okCount: ", okCount);

    client.on("data", function (data) {
      if (data.toString() === "+OK\n") {
        // console.log("ok");
        return;
      }

      // var is_kernel_buffer_full = client.write(data);
      // if (!is_kernel_buffer_full) {
      //   client.pause();
      // }
      // if (is_kernel_buffer_full) {
      //   console.log(
      //     "Data was flushed successfully from kernel buffer i.e written successfully!"
      //   );
      // } else {
      //   client.pause();
      // }
      // receivedCount++;
      // client.destroy(); // kill client after server's response
      // console.log("Received: " + data);
      // if (maxCount === receivedCount) {
      //   console.log("YESSSSSSSSS");
      // } else {
      //   console.log(receivedCount);
      // }
    });

    client.on("close", function () {
      console.log("Connection closed");
    });

    client.on("timeout", function () {
      console.log("Socket timed out !");
      client.end("Timed out!");
      // can call socket.destroy() here too.
    });

    client.on("drain", function () {
      console.log(
        "write buffer is empty now .. u can resume the writable stream"
      );
      client.resume();
    });
  }
}

export { HatiSdk };

export default HatiSdk;
