import { DataListPage } from "maishu-data-page";
import { ClientMessage } from "../../data-context";
import { dataSources } from "../data-sources";

export default class MessageListPage extends DataListPage<ClientMessage> {
    dataSource = dataSources.message;
    columns = [
        this.boundField({ dataField: "id", headerStyle: "编号" }),
        this.boundField({ dataField: "createDateTime", headerText: "时间" }),
    ];
}