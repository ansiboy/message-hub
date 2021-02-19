import * as React from "react";
import { io, ManagerOptions } from "socket.io-client";
import { HeaderNames } from "../header-names";

let extraHeaders: ManagerOptions["extraHeaders"] = {};
extraHeaders[HeaderNames.clientName] = "settlement";

const socket = io(`http://${location.host}/`, { extraHeaders });

interface Props {

}

interface State {
    name: string,
    time: Date,
    message: any
}

export default class MessageReceivePage extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        socket.onAny((name, data) => {
            this.setState({ name, message: data, time: new Date(Date.now()) })
        })
    }
    render() {

        let { time, message, name } = this.state || {};

        return <div className="container">
            <h2>消息接收</h2>
            <hr />
            {this.state ? <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">接收时间</label>
                    <div className="col-sm-10">
                        {time.toLocaleString()}
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">消息名称</label>
                    <div className="col-sm-10">
                        {name}
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">消息内容</label>
                    <div className="col-sm-10">
                        <pre>
                            {JSON.stringify(message, null, "    ")}
                        </pre>
                    </div>
                </div>
            </div> :
                <h4 className="text-center" style={{ margin: "100px 0 100px 0" }}>暂无消息</h4>
            }
        </div>
    }
}