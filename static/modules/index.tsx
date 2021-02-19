import * as React from "react";

export default class IndexPage extends React.Component {
    render() {
        return <div className="container">
            <h2>页面列表</h2>
            <ul className="list-group">
                <li className="list-group-item">
                    <a href="#send-message">发送消息</a>
                </li>
                <li className="list-group-item">
                    <a href="#message-receive">接收消息</a>
                </li>
            </ul>
        </div>
    }
}