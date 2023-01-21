import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { FriendButton } from "../friendbutton/friendbutton";

export function OtherProfile ({ }) {

    const { otherUserId } = useParams()
    const [ first, setFirst ] = useState("")
    const [ last, setLast ] = useState("")
    const [ image, setImage ] = useState("")
    const [ bio, setBio ] = useState("")
    const [ errMessage, setErrmessage ] = useState("")
    
    
    useEffect(() => {
        // console.log("otherUserId", otherUserId);
        fetch(`/user/${otherUserId}`)
        .then(res => res.json())
        .then(user => {
            // console.log("data dello user clickato", user)
            if (user.replace === true) {
                setErrmessage("User not found")
            } else {
                setFirst(user.first),
                setLast(user.last),
                setBio(user.bio)
                setImage(user.image)
                setErrmessage("")
                }    
        })
    },[])

    return ( <div>
        <p className="error">{errMessage}</p>

        { errMessage === "" &&
        <div className="profilebig">
            <img src={image} />
            <h2>{first} {last}</h2>
            <p>{bio}</p>
            <FriendButton otherUserId={otherUserId}/>         
        </div> 
        }
    </div>)


}
