import { WebsiteConfig } from "maishu-chitu-scaffold/static/types";

let w: WebsiteConfig = {
    requirejs: {
        paths: {
            "bootstrap-css": "node_modules/bootstrap/dist/css/bootstrap.min.css",
            "socket.io-client": "node_modules/socket.io-client/dist/socket.io.min"
        }
    },
    mode: "production",
}

export default w;