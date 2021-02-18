import { describe } from "mocha";
import { HeaderNames } from "../static/header-names";
import { io } from "socket.io-client";
import * as http from "http";
import { Callback, errors } from "maishu-toolkit";
import * as assert from "assert";

let config = require("../config.json");
let extraHeaders: { [key: string]: string } = {};
extraHeaders[HeaderNames.clientName] = "settlement";

let socket = io(`http://127.0.0.1:${config.port}`, {
    extraHeaders
});

type Message = { type: string, data: any, id: string };
let dataReceived = new Callback<Message>();

socket.on("Payment", (data: any, id: string) => {
    dataReceived.fire({ type: "Payment", data, id })

    console.log(data)
})

describe("send message", function () {
    it("Payment", function () {
        return new Promise((resolve, reject) => {
            let func = function (args: Message) {
                assert.strictEqual(args.type, "Payment");
                resolve({});
                dataReceived.remove(func);
            }

            dataReceived.add(func);

            postData("/sendMessage", {
                type: "Payment", data: { type: "Paypal", amount: 128 }
            })
        })
    })

    it("messageReceived", function () {
        return new Promise((resolve, reject) => {

            let func = function (args: Message) {
                assert.strictEqual(args.type, "Payment");

                postData("/messageReceived", { id: args.id })


                resolve({});
                dataReceived.remove(func);
            }

            dataReceived.add(func);

            postData("/sendMessage", {
                type: "Payment", data: { type: "Paypal", amount: 128 }
            })

        })

    })
})


function postData(url: string, data: any): Promise<any> {
    if (!data) throw errors.argumentNull("data");

    return new Promise((resolve, reject) => {
        var b = Buffer.from(JSON.stringify(data));

        let req = http.request({
            host: "127.0.0.1",
            port: config.port,
            path: url,
            method: "post",
            headers: {
                "content-type": "application/json",
                "content-length": b.length,
            },

        }, (res) => {
            res.on('data', d => {
                let text = d.toString();
                process.stdout.write(d)
                resolve({});
            })
        })

        req.write(b);
        req.end();
    })
}
