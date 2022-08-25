import { DataListPage, DataListPageState } from "maishu-data-page";
import { DataSource } from "maishu-toolkit";
import React = require("react");
import { ClientMessage } from "../../data-context";
import { dataSources } from "../data-sources";
import { hideDialog, showDialog } from "maishu-ui-toolkit";
import { MyService } from "../service";
import { PageProps } from "maishu-chitu-react";

let service = new MyService();

interface State extends DataListPageState {
    currentMessage?: ClientMessage
}

export default class MessageListPage extends DataListPage<ClientMessage, PageProps, State> {

    private dialogElement: HTMLElement;

    get dataSource(): DataSource<ClientMessage> {
        return dataSources.message;
    }

    columns = [
        this.boundField({ dataField: "id", headerText: "编号", headerStyle: { width: "320px" } }),
        this.boundField({ dataField: "name", headerText: "事件" }),
        this.dateTimeField({ dataField: "createDateTime", headerText: "时间" }),
    ];

    private showDialog(msg: ClientMessage) {
        this.setState({ currentMessage: msg });
        showDialog(this.dialogElement);
    }

    private sendMessage() {
        let msg = this.state?.currentMessage;
        if (!msg) return;
        
        service.sendMessage(msg.name, msg.data);
        hideDialog(this.dialogElement);
    }

    protected itemRightCommands(dataItem: ClientMessage): JSX.Element[] {
        return [
            <button className="btn btn-minier btn-info" onClick={() => this.showDialog(dataItem)}>
                发送消息
            </button>
        ]
    }

    render(): JSX.Element {
        let { currentMessage } = this.state || {};
        return <>
            {super.render()}
            <div className="modal fade" ref={e => this.dialogElement = e || this.dialogElement}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">发送消息</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group clearfix">
                                <label className="col-sm-2 control-label">名称</label>
                                <div className="col-sm-10">
                                    <input className="form-control" value={currentMessage?.name || ""} readOnly={true} />
                                </div>
                            </div>
                            <div className="form-group clearfix">
                                <label className="col-sm-2 control-label">内容</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" style={{ height: 300 }} value={JSON.stringify(currentMessage?.data)} readOnly={true}>

                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">
                                取消
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => this.sendMessage()}>
                                确定
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>;
    }
}