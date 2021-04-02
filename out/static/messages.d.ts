declare type Order = {};
export declare type Messages = {
    Payment: {
        type: "Paypal" | "CreditCard";
        amount: number;
    };
    OrderPaid: {
        order: Order;
    };
    Delivered: {
        orderId: string;
    };
};
export declare function getMessages(): Messages;
export {};
