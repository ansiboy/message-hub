import { ConnectionOptions } from "maishu-node-data";
export interface Config {
    port: number;
    db: ConnectionOptions;
}
export interface ContextData {
    config: Config;
}
