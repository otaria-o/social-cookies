import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import { FriendButton } from "../friendbutton/friendbutton";

export function OtherProfile ({ }) {

    const { otherUserId } = useParams()
    const [ first, setFirst ] = useState("")
    const [ last, setLast ] = useState("")
    const [ image, setImage ] = useState("")
    const [ bio, setBio ] = useState("")
    
    
    useEffect(() => {
        // console.log("Other user Id", otherUserId);
        fetch(`/user/${otherUserId}`)
        .then(res => res.json())
        .then(user => {
            console.log("data dello user clickato", user)
            setFirst(user.first),
            setLast(user.last),
            setBio(user.bio)
            setImage(user.image)
        })
    },[])

    return ( <div>
        <div>
            <img src={image} />
            <h2>{first} {last}</h2>
            <p>{bio}</p>
            <FriendButton otherUserId={otherUserId}/>
            <Link to="/people"><button>back</button></Link>
    </div>
    </div>)


}
