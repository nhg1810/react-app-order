import { createContext, useState } from "react";

export const SocketContext = createContext({})
export const SocketProvider = ({ children }) => {
    const [message, setMessage] = useState("haha")

    return (<SocketContext.Provider value={{ message }}>
        {children}
    </SocketContext.Provider>);
}