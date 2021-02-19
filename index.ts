import { errors } from "./errors";
import * as io from "socket.io";
import { startServer } from "maishu-node-mvc";
import { Config, ContextData } from "./declare";
import { ClientMessage } from "./data-context";
import { HeaderNames } from "./static/header-names";
import { Messenger } from "./messenger";
import { getVirtualPaths } from "maishu-chitu-scaffold";

export { Config } from "./declare";

type EmitArguments = [any, string];

export async function start(config: Config) {

    if (!config) throw errors.argumentNull("config");
    if (!config.port) throw errors.argumentFieldNull("port", "config");

    let virtualPaths = getVirtualPaths("static");
    delete virtualPaths["static/init.ts"];
    delete virtualPaths["static/website-config.ts"];

    let data: ContextData = { config };
    let webServer = startServer({
        websiteDirectory: __dirname,
        port: config.port,
        serverContextData: data,
        virtualPaths
    }, "mvc");

    let socketServer = new io.Server(webServer.source);
    socketServer.on("connection", function (socket: io.Socket) {
        let clientName = socket.request.headers[HeaderNames.clientName];
        if (!clientName) {
            console.error("Client is null or empty.");
        }

        let func = (msg: ClientMessage) => {
            if (msg.to == clientName) {
                let args: EmitArguments = [msg.data, msg.id];
                socket.emit(msg.name, ...args);
            }
        };
        Messenger.messageArrived.add(func);
        socket.on("disconnect", () => {
            Messenger.messageArrived.remove(func);
        });
    });

    socketServer.on("", function () {

    })
}



// start({ port: 6247 })