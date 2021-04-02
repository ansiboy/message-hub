import { guid } from "maishu-toolkit";

type Order = {};
export type Messages = {
    Payment: { type: "Paypal" | "CreditCard", amount: number },
    OrderPaid: { order: Order },
    Delivered: { orderId: string },
};


export function getMessages() {

    let messages: Messages = {
        Payment: {
            type: "Paypal",     // 支付类型
            amount: 109,     // 支付金额
        },
        OrderPaid: {
            order: {}
        },
        Delivered: { orderId: guid() }
    }

    return messages;
}