import { Callback } from "maishu-toolkit";
import { ClientMessage } from "./data-context";

export class Messenger {
    static messageArrived = new Callback<ClientMessage>();
}

