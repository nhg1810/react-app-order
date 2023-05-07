import { Component, createContext, useState } from "react";
import io from 'socket.io-client'

export const SocketContext = createContext({})
export class SocketProvider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: "hahaha",
            server: ""
        }
    }

    componentDidMount() {
        this.socket = io("https://40a6-113-176-178-251.ngrok-free.app");
        this.socket.on("server-respone", msg => {
            if (msg) {
                this.setState({
                    server: msg
                })
                console.log('server response: ', msg)
            }
        })
    }
    sendMessageToSocket = (text) => {
        this.setState({
            message: text
        })
        this.socket.emit(text.target, text);

    }
    render() {
        const { message, server } = this.state
        const { sendMessageToSocket } = this;
        return (<SocketContext.Provider value={{ message, sendMessageToSocket, server }}>
            {this.props.children}
        </SocketContext.Provider>);
    }
}