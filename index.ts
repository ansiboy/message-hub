import { errors } from "./errors";
import * as io from "socket.io";
import { startServer } from "maishu-node-mvc";
import { Config, ContextData } from "./declare";
import { Client, createDataContext, Message } from "./data-context";
import { HeaderNames } from "./static/header-names";
import { Messenger } from "./messenger";

export { Config } from "./declare";

export async function start(config: Config) {

    if (!config) throw errors.argumentNull("config");
    if (!config.port) throw errors.argumentFieldNull("port", "config");

    let data: ContextData = { config };
    let webServer = startServer({
        websiteDirectory: __dirname,
        port: config.port,
        serverContextData: data,
    }, "mvc");

    let dc = await createDataContext(config);
    let clients = await dc.clients.find();

    let socketServer = new io.Server(webServer.source);
    socketServer.on("connection", function (socket: io.Socket) {
        let clientName = socket.request.headers[HeaderNames.clientName];
        if (clientName) {
            Client.onlineClients[HeaderNames.clientName] = socket.id;
        }

        let func = (msg: Message) => {
            socket.emit(msg.type, msg.data);
        };
        Messenger.messageArrived.add(func);

        socket.on("disconnect", () => {
            debugger;
            Messenger.messageArrived.remove(func);
        });
    })

    socketServer.on("", function () {

    })
}



// start({ port: 6247 })