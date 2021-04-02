import { ConnectionOptions } from "maishu-node-data";
import { Callback } from "maishu-toolkit";
import { Message } from "./data-context";

export interface Config {
    port: number,
    db: ConnectionOptions,
}

export interface ContextData {
    config: Config,
}

