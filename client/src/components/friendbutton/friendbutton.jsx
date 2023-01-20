import { useState, useEffect } from 'react';

export function FriendButton ({ otherUserId }) {

    const [ msgbutton, setMsgbutton ] = useState("Make friend request" || "End friendship" || "Cancel request" || "Accept friend request")
    const [ friendship, setFriendship ] = useState("yes" || "not" || "pendingbysender_id" || "pendingbyOtherUser")
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
                    console.log("pending")
                    setFriendship("pendingbysender_id")
                    setMsgbutton("Cancel request")
                    } else if (data.rows[0].accepted === false) {
                        setFriendship("pendingbyOtherUser")
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