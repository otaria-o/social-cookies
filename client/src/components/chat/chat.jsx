// import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { socket } from "../../socket";

// export function Chat() {
//     const messages = useSelector((state) => state.messages);
//     const [message, setMessage] = useState("");

//     const onChatKeyDown = (e) => {
//         if (e.code === "Enter") {
//             e.preventDefault();
//             // emit via the socket
//             socket.emit("chatMessage", { message: message.trim() });
//             // clear the input field!
//         }
//     };

//     const onMessageChange = (e) => {
//         setMessage(e.currentTarget.value)
//     }

//     setMessages(
//         socket.on("chatMessages", )
//     )

//     return ( <div>
//         <div className="new-message">
//             <textarea
//                 name="message"
//                 placeholder="Your message here"
//                 onKeyDown={(e) => onChatKeyDown(e)}
//                 onChange={(e) => onMessageChange(e)}
//                 value={message}
//             ></textarea>
//         </div>
//         <div>
//         {messages.map((message) => (
//         <div key={sender_id}>
//             <p>{message}</p>
//             <p><b>{almostFriend.first}</b> {created_at}</p>
//         </div> ))} 
//         </div>              
//     </div>
//     )
// }