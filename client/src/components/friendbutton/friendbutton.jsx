import { useState, useEffect } from 'react';

export function FriendButton ({ otherUserId }) {

    const [ msgbutton, setMsgbutton ] = useState("Make friend request" || "Cancel friend request" || "Accept friend request")

    useEffect(() => {
        fetch(`/user/friend/${otherUserId}`)
        .then(res => res.json())
        .then(user => {
            console.log("data dello user clickato", user)
           
            // switch {
            //     case 
            // }
        })
    })

    return ( <div>
        <button>{msgbutton}</button>
    </div>)

}