import { Column, DataContext, DataHelper, Entity, EntityManager, PrimaryColumn, Repository } from "maishu-node-data";
import { createParameterDecorator } from "maishu-node-mvc";
import { Config, ContextData } from "./declare";

@Entity({ name: "message" })
export class Message {
    @PrimaryColumn({ type: "char", length: 36 })
    id: string;

    @Column({ type: "varchar", length: "30" })
    type: string;

    @Column({ type: "json" })
    data: any;

    @Column({ type: "datetime" })
    createDateTime: Date;

    /** 接收此信息的客户端名称, 空为所以 */
    @Column({ name: "to", type: "json", nullable: true })
    to?: string[];
}

@Entity({ name: "client_message" })
export class ClientMessage {
    @PrimaryColumn({ type: "char", length: 36 })
    id: string;

    @Column({ type: "varchar", length: "30" })
    type: string;

    @Column({ type: "json" })
    data: any;

    @Column({ type: "datetime" })
    createDateTime: Date;

    /** 接收此信息的客户端名称 */
    @Column({ name: "to", type: "varchar", length: 50 })
    to: string;

    /** 信息是否已经接收 */
    @Column({ type: "bit", default: false })
    received: boolean;
}

@Entity({ name: "client" })
export class Client {
    @PrimaryColumn({ type: "char", length: 36 })
    name: string;

    @Column({ type: "datetime" })
    createDateTime: Date;

    @Column({ type: "varchar", length: 100, nullable: true })
    remark: string;

    @Column({ name: "listen-messages", type: "json", nullable: true })
    listenMessages: string[];

    static onlineClients: { [key: string]: string } = {};
}


export class MyDataContext extends DataContext {

    messages: Repository<Message>;
    clients: Repository<Client>;
    clientMessages: Repository<ClientMessage>;

    constructor(m: EntityManager) {
        super(m);

        this.messages = m.getRepository(Message);
        this.clients = m.getRepository(Client);
        this.clientMessages = m.getRepository(ClientMessage);
    }
}

export let dataContext = createParameterDecorator<MyDataContext, ContextData>(async (ctx) => {
    if (ctx.data == null) throw new Error("Context data is null.");

    let dc = DataHelper.createDataContext(MyDataContext, ctx.data.config.db);
    return dc;
})

export function createDataContext(config: Config) {
    let db = Object.assign({ entities: ["./data-context.js"] } as typeof config.db,
        config.db);
    let dc = DataHelper.createDataContext(MyDataContext, db);
    return dc;
}

