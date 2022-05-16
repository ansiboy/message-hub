import { errors } from "./errors";
import * as io from "socket.io";
import { startServer } from "maishu-node-mvc";
import { Config, ContextData } from "./declare";
import { ClientMessage } from "./data-context";
import { HeaderNames } from "./static/header-names";
import { Messenger } from "./messenger";
import { getVirtualPaths } from "maishu-admin-scaffold";
import * as path from "path";
export { Config } from "./declare";

type EmitArguments = [any, string];

export async function start(config: Config) {

    if (!config) throw errors.argumentNull("config");
    if (!config.port) throw errors.argumentFieldNull("port", "config");

    let virtualPaths = getVirtualPaths("static", path.join(__dirname, "static"));
    virtualPaths["node_modules"] = path.join(__dirname, "../node_modules");
    
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
            let args: EmitArguments = [msg.data, msg.id];
            socket.emit(msg.name, ...args);
        };
        Messenger.messageArrived.add(func);
        socket.on("disconnect", () => {
            Messenger.messageArrived.remove(func);
        });
    });
}



// start({ port: 6247 })