import { WebsiteConfig } from "maishu-admin-scaffold/static/website-config";

let w: WebsiteConfig = {
    requirejs: {
        paths: {
            "socket.io-client": "node_modules/socket.io-client/dist/socket.io.min",
            "maishu-data-page": "node_modules/maishu-data-page/dist/index.min"
        }
    },
    menuItems: [
        { id: "87CCEBF9-8158-4DA0-BD32-406ABB10EEDD", name: "发送消息", path: "#send-message" },
        { id: "D27DF93E-0B6F-4343-A01A-F2A2AF513D57", name: "接收消息", path: "#message-receive" },
        { id: "26BCC9CF-EB2C-4CF5-9C8A-50C383EB4C66", name: "消息列表", path: "#message-list" }
    ],
    mode: "production",
}

export default w;