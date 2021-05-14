import { Service } from "maishu-chitu-service";
import { DataSourceArguments, DataSourceSelectArguments, DataSourceSelectResult } from "maishu-wuzhui-helper";
import * as ui from "maishu-ui-toolkit";
import { ClientMessage } from "../data-context";

export class MyService extends Service {

    constructor() {
        super(err => errorHandle(err));

    }

    sendMessage(name: string, data: any) {
        return this.postByJson("sendMessage", { name, data });
    }

    messageList(args: DataSourceSelectArguments) {
        let url = "message/list";
        return this.postByJson<DataSourceSelectResult<ClientMessage>>(url, { args });
    }
}

export function errorHandle(err: Error) {
    ui.alert({ title: "错误", message: err.message })
}