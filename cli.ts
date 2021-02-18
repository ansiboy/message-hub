import * as yargs from "yargs";
import * as path from "path";
import * as inquirer from "inquirer";
import * as colors from "colors";
import { errors } from "./errors";
import * as fs from "fs";
import { ConnectionOptions, DataHelper, } from "maishu-node-data";
import { Config, start as startServer } from "./index";
import { ConnectionConfig, createConnection } from "mysql";
import { MyDataContext } from "./data-context";

const configFilePath = path.join(__dirname, "config.json");
const pkg = require("./package.json");
console.assert(pkg != null);
console.assert(pkg.name != null);

const EMPTY_FUNC = () => { };
yargs.command("database", "设置数据库", EMPTY_FUNC, setDatabasae)
    .command("port", "设置端口", EMPTY_FUNC, setPort)
    .command("start", "启动程序", EMPTY_FUNC, start)
    .command("client", "设置客户端", EMPTY_FUNC, setClient)
    .demandCommand()
    .argv;

let config = getConfig();

async function setPort() {
    let { port } = await inquirer.prompt({ type: "input", name: "port", message: "请输入网关端口", default: 6247, });
    config.port = Number.parseInt(port);
    saveConfig(config);
    console.log(colors.green("设置端口成功").bold);
    return port;
}

async function setDatabasae() {
    const dbTypes = {
        sqlite: "sqlite",
        mysql: "mysql"
    }
    let { dbType } = await inquirer.prompt({
        type: "list", name: "dbType", message: "请选择数据库类型",
        choices: [dbTypes.sqlite, dbTypes.mysql]
    });

    switch (dbType) {
        case dbTypes.sqlite:
            config.db = {
                type: "sqlite",
                database: path.join(__dirname, `../../db/${pkg.name}.db`),
            };
            break;
        case dbTypes.mysql:
            let { host } = await inquirer.prompt({ type: "input", message: "请输入数据库地址", name: "host", default: "127.0.0.1" });
            let { port } = await inquirer.prompt({ type: "input", message: "请输入端口", name: "port", default: "3306", });
            let { username } = await inquirer.prompt({ type: "input", message: "请输入用户名", name: "username", default: "root" });
            let { password } = await inquirer.prompt({ type: "input", message: "请输入密码", name: "password" });

            config.db = { type: "mysql", host, port, username, password, database: pkg.name, };

            break;

        default:
            throw errors.notSupportedDatabaseType(dbType);
    }

    await initDatabase(config.db);

    saveConfig(config);

    console.log(colors.green("创建数据库成功").bold);
}

async function setClient() {
    let { clientName } = await inquirer.prompt({ type: "input", message: "请输入客户端名称", name: "clientName" });
    let dbConfig = Object.assign(config.db, { synchronize: true, entities: ["data-context.js"] } as typeof config.db);
    let dataContext = await DataHelper.createDataContext(MyDataContext, dbConfig);

    await dataContext.clients.insert({ name: clientName, createDateTime: new Date(Date.now()) });
    console.log(colors.green("添加客户端成功"))
}

async function start() {
    let config = getConfig();
    startServer(config);
}

function getConfig(): Config {
    if (fs.existsSync(configFilePath) == false)
        return {} as Config;

    let obj = JSON.parse(fs.readFileSync(configFilePath).toString());
    return obj;
}

export function saveConfig(config: Config) {
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, "    "));
}

export async function initDatabase(connConfig: ConnectionOptions) {
    if (connConfig.type == "mysql") {
        await createDatabaseIfNotExists({
            user: connConfig.username, password: connConfig.password,
            host: connConfig.host, port: connConfig.port, database: connConfig.database,
        });
    }
}

export function createDatabaseIfNotExists(connConfig: ConnectionConfig): Promise<boolean> {
    if (!connConfig) throw errors.argumentNull("connConfig");
    if (!connConfig.database) throw errors.argumentFieldNull("database", "connConfig");

    let dbName = connConfig.database;
    connConfig = Object.assign({}, connConfig);
    connConfig.database = "mysql";

    // let logger = getLogger(`${constants.projectName} ${createDatabaseIfNotExists.name}`, g.settings.logLevel);

    let conn = createConnection(connConfig);
    let cmd = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "${dbName}"`;
    return new Promise<boolean>(function (resolve, reject) {
        conn.query(cmd, function (err?: Error, result?: Array<any>) {
            if (err || result == null) {
                reject(err);
                console.log("err")
                return;
            }

            if (result.length > 0) {
                resolve(false);
                return;
            }

            let sql = `CREATE DATABASE \`${dbName}\``;
            if (connConfig.charset) {
                sql = sql + ` CHARACTER SET ${connConfig.charset}`;
            }
            conn.query(sql, function (err?: Error) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(true);
            });

        });
    })
}


