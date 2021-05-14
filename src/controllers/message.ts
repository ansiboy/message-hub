import { DataHelper } from "maishu-node-data";
import { action, controller, routeData } from "maishu-nws-mvc";
import { DataSourceSelectArguments } from "maishu-toolkit";
import { dataContext, MyDataContext } from "../data-context";

@controller("message")
export class MessageController {
    @action()
    async list(@dataContext dc: MyDataContext, @routeData d: { args?: DataSourceSelectArguments }) {
        let r = await DataHelper.list(dc.messages, { selectArguments: d.args });
        return r;
    }
}