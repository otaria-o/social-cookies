import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { socket } from "../../socket";
import { connect, disconnect } from "socket.io-client";

export function Chat() {
    // const messages = useSelector((state) => state.messages);
    const [messages, setMessage] = useState([]);
    const socket = connect();

    const onChatKeyDown = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            console.log( e.currentTarget.value)
            // emit via the socket
            socket.emit("chatMessage", e.currentTarget.value);
            // clear the input field!
        }
    };

    // const onMessageChange = (e) => {
    //     setMessage(e.currentTarget.value)
    // }

    useEffect(() => {

        

    // I receive a list of messages (prob. at the beginning)
    socket.on("chatMessages", (data) => {
        console.log("data from chat", data )
        setMessage(data)
        // const action = recentMessagesReceived(data.messages);
        // store.dispatch(action);
    });

    // I receive a single message when someone has sent it to the server
    socket.on("chatMessage", (data) => {
        setMessage((allMessages) => {
            console.log("messaggio nuovo", allMessages, data)
            return [...allMessages, data]
        })
        // const action = singleMessageReceived(data.message);
        // store.dispatch(action);
    });

    },[])
    
    console.log("messages", messages)
    return ( <div>
        <div className="new-message">
            <textarea
                name="message"
                placeholder="Your message here"
                onKeyDown={(e) => onChatKeyDown(e)}
                // onChange={(e) => onMessageChange(e)}
            ></textarea>
        </div>
        <div>
        

       { messages.map((message) => (
        <div key={message.id}>
            <p>{message.message}</p>
            <p><b>{message.first}</b> {message.created_at}</p>
        </div> ))}
        
        </div>              
    </div>
    )
}