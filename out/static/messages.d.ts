declare type Order = {};
export declare type Messages = {
    Payment: {
        type: "Paypal" | "CreditCard";
        amount: number;
    };
    OrderPaid: {
        order: Order;
    };
    /** 已发货 */
    Delivered: {
        orderId: string;
    };
    Refund: {
        orderId: string;
        orderDetails: {
            /** 产品编号 */
            productId: string;
            /** 该产品退款总退款金额 */
            amount: number;
            /** 退货数量 */
            quantity: number;
        }[];
        /** 退款总金额 */
        total: number;
        data?: any;
    };
};
export declare function getMessages(): {
    [name: string]: any;
};
export {};
