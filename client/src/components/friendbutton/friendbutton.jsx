import { useState, useEffect } from 'react';

export function FriendButton ({ otherUserId }) {

    const [ msgbutton, setMsgbutton ] = useState("")
    const [ friendship, setFriendship ] = useState("yes" || "not" || "pendentbysender_id" || "pendentbyOtherUser")
    const [ errMessage, setErrmessage ] = useState("")


    const handleClick = (evt) => {
        evt.preventDefault();

        fetch(`/user/friendrequest/${otherUserId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                friendship: friendship
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("come va questa amicizia?", data)
            if (!data.rows[0]) {
                console.log("hallo")
                setFriendship("not")
                setMsgbutton("Make friend request")
            } else if (data.rows[0].accepted === true) {
                setFriendship("yes")
                setMsgbutton("End friendship")
                } else if (data.rows[0].recipient_id === otherUserId) {
                    console.log("pendent")
                    setFriendship("pendentbysender_id")
                    setMsgbutton("Cancel request")
                    } else if (data.rows[0].accepted === false) {
                        setFriendship("pendentbyOtherUser")
                        setMsgbutton("Accept friend request")
                        } else if (!result.success) {
                            // ritorna il messaggio di errore
                            setErrmessage("Sorry, something went wrong, try again later.")    
                        }
        })
        .catch(err => {
            console.log("errore nella FRIENDREQ", err)
            // ritorna il messaggio di errore
            setErrmessage("Sorry, something went wrong, try again later.")
        })
    }

    useEffect(() => {
        fetch(`/user/friend/${otherUserId}`)
        .then(res => res.json())
        .then(friendship => {
            console.log("data della amicizia al bottone", friendship)
            
            // a setFriendship will be useful in the onClick: depending on the friendship state it will return the new message
            
            //  if (friendship.buttonText === "End friendship" ) {
            //     setMsgbutton("End friendship")
            //     setFriendship("yes")
            // }  
            // else if(friendship.buttonText === "Make friend request") {
            //     setMsgbutton("Make friend request")
            //     setFriendship("not")
            // } 
            
            //     else if (friendship.buttonText === "Cancel request" ) {
            //         setMsgbutton("Cancel request")
            //         setFriendship("pendentbysender_id")
            //     } 
                
                    
                    
            //             else if (friendship.buttonText === "Accept friendship" ) {
            //                 setMsgbutton("Accept friend request")
            //                 setFriendship("pendentbyOtherUser")
            //             }
            setFriendship(friendship.friendship)
            setMsgbutton(friendship.msgbutton)
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