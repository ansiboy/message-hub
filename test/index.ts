import { describe } from "mocha";
import { HomeController } from "../controllers/home";
import { createDataContext } from "../data-context";
import { HeaderNames } from "../static/header-names";
import { io } from "socket.io-client";
import { start } from "../index";
import * as http from "http";

let config = require("../config.json");
let extraHeaders: { [key: string]: string } = {};
extraHeaders[HeaderNames.clientName] = "settlement";

// start(config).then(() => {
let socket = io(`http://127.0.0.1:${config.port}`, {
    extraHeaders
});

socket.on("Payment", (data: any) => {
    console.log(data)
    debugger;
})
// })


let ctrl = new HomeController();
describe("send message", function () {
    it("Payment", async function () {
        // socket.emit("Payment", { type: "Paypal" });
        // let dc = await createDataContext(config);

        // ctrl.sendMessage(dc, { type: "Payment", data: { type: "Paypal", amount: 128 } })

        var b = Buffer.from(JSON.stringify({
            type: "Payment", data: { type: "Paypal", amount: 128 }
        }));

        let req = http.request({
            host: "127.0.0.1",
            port: config.port,
            path: "/sendMessage",
            method: "post",
            headers: {
                "content-type": "application/json",
                "content-length": b.length,
            },

        }, (res) => {
            debugger;

            res.on('data', d => {
                let text = d.toString();
                process.stdout.write(d)
            })
        })


        req.write(b);

        req.end();

    })

})
