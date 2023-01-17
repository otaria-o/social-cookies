import { useState, useEffect } from 'react';

export function FriendButton ({ otherUserId }) {

    const [ msgbutton, setMsgbutton ] = useState("")


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
            console.log("data dello user clickato", friendship)
            
            if ({friendship: false}) {
                setMsgbutton("vuoi essere mio amico?")
            } else if ({friendship: true}) {
                setMsgbutton("non sono piu tuo amico")
            } else if ({pendent: sender_id}) {
                setMsgbutton("ritira la tua richiesta")
            }
            // switch (msgbutton) {
            //     case (friendship === {friendship: false}) :
            //         setMsgbutton("vuoi essere mio amico?")
            //         break;
            //     case (friendship === {accepted: true}) :
            //         setMsgbutton("non sono piu tuo amico")
            //         break;
                // case 
            })
           
        // }) 
    })

    return ( <div>
        <button >{msgbutton}</button>
    </div>)

}

// onClick={handleClick}