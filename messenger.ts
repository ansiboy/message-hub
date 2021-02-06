import { Callback } from "maishu-toolkit";
import { Message } from "./data-context";

export class Messenger {
    static messageArrived = new Callback<Message>();
}

