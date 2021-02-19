import { Service } from "maishu-chitu-service";
import * as ui from "maishu-ui-toolkit";

export class MyService {
    private service: Service;

    constructor() {
        this.service = new Service(err => errorHandle(err));
    }

    sendMessage(name: string, data: any) {
        return this.service.postByJson("sendMessage", { name, data });
    }
}

export function errorHandle(err: Error) {
    ui.alert({ title: "错误", message: err.message })
}