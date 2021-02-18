import { action, controller, routeData } from "maishu-node-mvc";
import { guid } from "maishu-toolkit";
import { ClientMessage, dataContext, Message, MyDataContext } from "../data-context";
import { Messenger } from "../messenger";
import { errors } from "../errors";

@controller("/")
export class HomeController {

    /**
     * 发送消息
     * @param d 请求参数
     * @param d.type 消息类型
     * @param dc.data 消息数据
     */
    @action()
    async sendMessage(@dataContext dc: MyDataContext, @routeData d: { type: string, data: any }) {
        if (!d.type) throw errors.argumentFieldNull("type", "d");

        d.data = d.data || {};

        let item = Object.assign(d, {
            id: guid(),
            createDateTime: new Date(Date.now())
        } as Message);


        await dc.messages.insert(item);

        let clients = await dc.clients.find();

        let cms = clients.map(o => ({
            id: guid(),
            createDateTime: new Date(Date.now()),
            type: item.type,
            to: o.name,
            data: item.data,
            received: false,
        } as ClientMessage));

        await dc.clientMessages.insert(cms);
        cms.forEach(c => {
            Messenger.messageArrived.fire(c);
        })

        return { id: item.id };
    }

    /**
     * 设置消息已收到
     * @param d 请求参数
     * @param d.id 消息编号
     */
    @action()
    async messageReceived(@dataContext dc: MyDataContext, @routeData d: { id: string }) {
        if (!d.id) throw errors.argumentFieldNull("id", "d");
        let cm = await dc.clientMessages.findOne(d.id);
        if (cm == null)
            throw errors.objectNotExists("ClientMessage", d.id);

        return { id: d.id };
    }
}