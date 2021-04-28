import * as React from "react";
interface Props {
}
interface State {
    messageName: string;
    messageContent: string;
    custom: boolean;
}
export default class IndexPage extends React.Component<Props, State> {
    private typeInput;
    private contentInput;
    constructor(props: Props);
    private sendMessage;
    render(): JSX.Element;
}
export {};
