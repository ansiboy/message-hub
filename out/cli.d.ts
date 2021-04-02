import { ConnectionOptions } from "maishu-node-data";
import { Config } from "./index";
import { ConnectionConfig } from "mysql";
export declare function saveConfig(config: Config): void;
export declare function initDatabase(connConfig: ConnectionOptions): Promise<void>;
export declare function createDatabaseIfNotExists(connConfig: ConnectionConfig): Promise<boolean>;
