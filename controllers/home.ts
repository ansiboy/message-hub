import { action, contextData, controller, routeData, serverContext } from "maishu-node-mvc";
import { ServerContext as MVCRequestContext } from "maishu-node-mvc";
import { errors, guid } from "maishu-toolkit";
import { ClientMessage, dataContext, Message, MyDataContext } from "../data-context";
import { ContextData } from "../declare";
import { Messenger } from "../messenger";

@controller("/")
export class HomeController {

    @action()
    async sendMessage(@dataContext dc: MyDataContext, @routeData d: { type: string, data: any }) {
        if (!d.type) throw errors.argumentFieldNull("type", "d");

        d.data = d.data || {};

        let item = Object.assign(d, {
            id: guid(),
            createDateTime: new Date(Date.now())
        } as Message);


        Messenger.messageArrived.fire(item);

        await dc.messages.insert(item);

        let clients = await dc.clients.find();

        for (let i = 0; i < clients.length; i++) {
            let cm: ClientMessage = {
                id: guid(),
                createDateTime: new Date(Date.now()),
                type: item.type,
                to: clients[i].name,
                data: item.data,
                received: false,
            }

            await dc.clientMessages.insert(cm);
        }

        return { id: item.id };
    }
}