import { ConnectionOptions, DataContext, EntityManager, Repository } from "maishu-node-data";
export declare class Message {
    id: string;
    name: string;
    data: any;
    createDateTime: Date;
    /** 接收此信息的客户端名称, 空为所以 */
    to?: string[];
}
export declare class ClientMessage {
    id: string;
    name: string;
    data: any;
    createDateTime: Date;
    /** 接收此信息的客户端名称 */
    to?: string;
    /** 信息是否已经接收 */
    received: boolean;
}
export declare class Client {
    name: string;
    createDateTime: Date;
    remark: string;
    listenMessages: string[];
    static onlineClients: {
        [key: string]: string;
    };
}
export declare class MyDataContext extends DataContext {
    messages: Repository<Message>;
    clients: Repository<Client>;
    clientMessages: Repository<ClientMessage>;
    constructor(m: EntityManager);
}
export declare let dataContext: (target: any, propertyKey: string | symbol, parameterIndex: number) => void;
export declare function createDataContext(db: ConnectionOptions): Promise<MyDataContext>;
