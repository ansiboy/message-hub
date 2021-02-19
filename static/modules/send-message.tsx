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
    currentMessageName: string,
}

export default class IndexPage extends React.Component<Props, State> {

    private typeInput: HTMLSelectElement;
    private contentInput: HTMLTextAreaElement;

    constructor(props: Props) {
        super(props);

        this.state = {
            currentMessageName: messageNames[0]
        };
    }

    private async sendMessage() {
        let obj = JSON.parse(this.contentInput.value);
        return service.sendMessage(this.typeInput.value, obj);
    }

    render() {
        return <div className="container">
            <h2>发送消息</h2>
            <hr />
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">消息类型</label>
                    <div className="col-sm-10">
                        <select className="form-control"
                            value={this.state.currentMessageName || ""}
                            ref={e => this.typeInput = e || this.typeInput}
                            onChange={e => {
                                this.setState({ currentMessageName: e.target.value })
                            }}>
                            {messageNames.map(o => <option key={o} value={o}>
                                {o}
                            </option>)}
                        </select>
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
                            value={JSON.stringify(messages[this.state.currentMessageName], null, "    ")}
                            onChange={e => {
                                messages[this.state.currentMessageName] = e.target.value;
                            }} />
                    </div>
                </div>

                <div className="form-group text-right">
                    <div className="col-sm-12">
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