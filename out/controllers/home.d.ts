import { MyDataContext } from "../data-context";
export declare class HomeController {
    /**
     * 发送消息
     * @param d 请求参数
     * @param d.name 消息名称
     * @param dc.data 消息数据
     */
    sendMessage(dc: MyDataContext, d: {
        name: string;
        data: any;
    }): Promise<{
        id: string;
    }>;
    /**
     * 设置消息已收到
     * @param d 请求参数
     * @param d.id 消息编号
     */
    messageReceived(dc: MyDataContext, d: {
        id: string;
    }): Promise<{
        id: string;
    }>;
}
