import * as React from "react";
declare let messages: import("../messages").Messages;
interface Props {
}
interface State {
    currentMessageName: keyof typeof messages;
}
export default class IndexPage extends React.Component<Props, State> {
    private typeInput;
    private contentInput;
    constructor(props: Props);
    private sendMessage;
    render(): JSX.Element;
}
export {};
