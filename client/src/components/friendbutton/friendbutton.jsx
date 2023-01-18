import { useState, useEffect } from 'react';

export function FriendButton ({ otherUserId }) {

    const [ msgbutton, setMsgbutton ] = useState("")
    const [ friendship, setFriendship ] = useState(true || false || "pendentbysender_id" || "pendentbyOtherUser")
    const [ errMessage, setErrmessage ] = useState("")


    // handleClick = (evt) => {
    //     evt.preventDefault();
    //     switch () {
    //         case 
    //     }
    // }

    useEffect(() => {
        fetch(`/user/friend/${otherUserId}`)
        .then(res => res.json())
        .then(friendship => {
            console.log("data della amicizia al bottone", friendship)

            // switch(friendship) {
            //     case !friendship.friendship :
            //         setMsgbutton("Make friend request")
            //         setFriendship(false)
            //         break;
                
            //     case friendship.friendship :
            //         setMsgbutton("End friendship")
            //         setFriendship(true)
            //         break;
                
            //     case friendship.pendentbysender_id :
            //         setMsgbutton("Cancel friend request")
            //         setFriendship("pendentbysender_id")
            //         break;

            //     case friendship.pendentbyOtherUser :
            //         setMsgbutton("Accept friend request")
            //         setFriendship("pendentbyOtherUser")
            //         break;
            // }
            
            // a setFriendship will be useful in the onClick: depending on the friendship state it will return the new message
            if (!friendship.friendship) {
                setMsgbutton("Make friend request")
                setFriendship(false)
            } 
            
                else if (friendship.friendship) {
                    setMsgbutton("End friendship")
                    setFriendship(true)
                } 
                
                    else if (friendship.sender_id !== otherUserId) {
                        setMsgbutton("Cancel friend request")
                        setFriendship("pendentbysender_id")
                    } 
                    
                        else if (friendship.sender_id === otherUserId) {
                            setMsgbutton("Accept friend request")
                            setFriendship("pendentbyOtherUser")
                        }

            })
            .catch(err => {
                console.log("errore nella fetch AMICIZIA", err)
                // ritorna il messaggio di errore
                setErrmessage("Sorry, something went wrong, try again later.")
                })
    }, [msgbutton])

    return ( <div>
        <button >{msgbutton}</button>
        <p className="error">{errMessage}</p>
    </div>)

}

// onClick={handleClick}