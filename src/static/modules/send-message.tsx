import * as React from "react";
import { buttonOnClick } from "maishu-ui-toolkit";
import { MyService } from "../service";
import { getMessages } from "../messages";

let service = new MyService();
let messages = getMessages();
let messageNames = Object.getOwnPropertyNames(messages);

interface Props {

}

interface State {
    messageName: string,
    messageContent: string,
    custom: boolean,
}

export default class IndexPage extends React.Component<Props, State> {

    private typeInput: HTMLSelectElement;
    private contentInput: HTMLTextAreaElement;

    constructor(props: Props) {
        super(props);

        this.state = {
            messageName: messageNames[0],
            messageContent: JSON.stringify(messages[messageNames[0]], null, "    "),
            custom: false
        };
    }

    private async sendMessage() {
        let obj = JSON.parse(this.contentInput.value);
        let messageName = this.state.messageName;
        return service.sendMessage(messageName, obj);
    }

    render() {
        let { custom, messageName, messageContent } = this.state;
        return <div className="container">
            <h2>发送消息</h2>
            <hr />
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">消息类型</label>
                    <div className="col-sm-10">
                        {custom ?
                            <input className="form-control" value={messageName || ""}
                                onChange={e => {
                                    this.setState({ messageName: e.target.value })
                                }} /> :
                            <select className="form-control"
                                value={messageName || ""}
                                ref={e => this.typeInput = e || this.typeInput}
                                onChange={e => {
                                    messageContent = messages[e.target.value] ? JSON.stringify(messages[e.target.value], null, "    ") : "";
                                    this.setState({ messageName: e.target.value as any, messageContent })
                                }}>
                                {messageNames.map(o => <option key={o} value={o}>
                                    {o}
                                </option>)}
                            </select>}
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">消息类型</label>
                    <div className="col-sm-10">
                        <input className="form-control" value={messageName || ""}
                            onChange={e => {
                                this.setState({ messageName: e.target.value })
                            }} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">接收者</label>
                    <div className="col-sm-10">
                        <input className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">消息内容</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" style={{ height: 200 }}
                            ref={e => this.contentInput = e || this.contentInput}
                            value={messageContent || ""}
                            onChange={e => {
                                // messages[currentMessageName] = JSON.parse(e.target.value);
                                this.setState({ messageContent: e.target.value });
                            }} />
                    </div>
                </div>

                <div className="form-group text-right">
                    <div className="col-sm-10 col-md-offset-2">
                        <div className="checkbox pull-left">
                            <label>
                                <input type="checkbox" checked={custom}
                                    onChange={e => {
                                        this.setState({ custom: e.target.checked })
                                    }} /> 自定义消息
                            </label>
                        </div>
                        <button className="btn btn-primary" onClick={() => this.sendMessage()}
                            ref={e => {
                                if (!e) return;
                                buttonOnClick(e, () => this.sendMessage())
                            }}>
                            <i className="glyphicon glyphicon-ok" style={{ marginRight: 5 }} />
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }
}