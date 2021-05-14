import { DataSource } from "maishu-wuzhui-helper";
import { ClientMessage } from "../data-context";
import { MyService } from "./service";

let service = new MyService();
let messageDataSource = new DataSource<ClientMessage>({
    select: (args) => {
        return service.messageList(args);
    }
})

export let dataSources = {
    message: messageDataSource
}