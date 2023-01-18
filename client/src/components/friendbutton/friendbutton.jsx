import { useState, useEffect } from 'react';

export function FriendButton ({ otherUserId }) {

    const [ msgbutton, setMsgbutton ] = useState("")
    const [ friendship, setFriendship ] = useState(true || false || "pendentbysender_id" || "pendentbyOtherUser")
    // const [ request, setRequest ] = useState("")
    const [ errMessage, setErrmessage ] = useState("")


    const handleClick = (evt) => {
        evt.preventDefault();

        // switch (friendship) {
        //     case true :
        //         setRequest("End friendship")
        //         break;
        //     case false :
        //         setRequest("Make friend request")
        //         break;
        //     case "pendentbysender_id" :
        //         setRequest("Cancel request")
        //         break;
        //     case "pendentbyOtherUser" :
        //         setRequest("Accept friend request")
        //         break;    
        // }

        fetch(`/user/friendrequest/${otherUserId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // request : request,
                friendship: friendship
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log("come va questa amicizia?", result)
            if (!result) {
                setFriendship(false)
                setMsgbutton("cancel friend request")
                console.log("hallo")
             } else if (result.accepted) {
                setFriendship(true)
                setMsgbutton("End friendship")
            
            } else if ((!result.accepted) && result.sender_id === otherUserId) {
                setFriendship("pendentbyOtherUser")
                setMsgbutton("Accept friend request")
            } else if ((!result.accepted) && result.recipient_id === otherUserId) {
                setFriendship("pendentbysender_id")
                setMsgbutton("Cancel request")
            }

        })
        .catch(err => {
            console.log("errore nella FRIENDREQ", err)
            setErrmessage("Sorry, something went wrong, try again later.")
        })
    }

    useEffect(() => {
        fetch(`/user/friend/${otherUserId}`)
        .then(res => res.json())
        .then(friendship => {
            console.log("data della amicizia al bottone", friendship)
            
            // a setFriendship will be useful in the onClick: depending on the friendship state it will return the new message
            
             if (friendship.buttonText === "End friendship" ) {
                setMsgbutton("End friendship")
                setFriendship(true)
            }  
            else if(friendship.buttonText === "Make friend request") {
                setMsgbutton("Make friend request")
                setFriendship(false)
            } 
            
                else if (friendship.buttonText === "Cancel request" ) {
                    setMsgbutton("Cancel request")
                    setFriendship("pendentbysender_id")
                } 
                
                    
                    
                        else if (friendship.buttonText === "Accept friendship" ) {
                            setMsgbutton("Accept friend request")
                            setFriendship("pendentbyOtherUser")
                        }

            })
            .catch(err => {
                console.log("errore nella fetch AMICIZIA", err)
                // ritorna il messaggio di errore
                setErrmessage("Sorry, something went wrong, try again later.")
                })
    }, [friendship, msgbutton])

    return ( <div>
        <button onClick={handleClick}>{msgbutton}</button>
        <p className="error">{errMessage}</p>
    </div>)

}