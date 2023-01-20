import { useState, useEffect } from 'react';
// import { OtherProfile } from "../otherprofile/otherprofile"
import { Link } from 'react-router-dom';

export function Friends ({ id }) {

    // const { otherUserId } = useParams()
    const [ friends, setFriends ] = useState([])
    const [ almostFriends, setAlmostFriends ] = useState([])
    // const [ first, setFirst ] = useState("")
    // const [ last, setLast ] = useState("")
    // const [ image, setImage ] = useState("")
    // const [ bio, setBio ] = useState("")
    
    
    useEffect(() => {
        // console.log("otherUserId", otherUserId);
        fetch("/friends")
        .then(res => res.json())
        .then(data => {
            console.log("arrivano gli array?", data),
            setFriends(),
            setAlmostFriends()
            // setFirst(user.first),
            // setLast(user.last),
            // setBio(user.bio)
            // setImage(user.image)
        })
    },[])

    return ( 
        <div>
            <h3>These peolpe want to be your friends</h3>
                <div>
                    {almostFriends.map((almostFriend) => (
                    <div className="user" key={almostFriend.id}>
                        <div>
                        <img src={almostFriend.image} />
                        </div>
                        <div>
                        <h3>{almostFriend.first} {almostFriend.last}</h3>
                        </div>
                    </div>))}
                </div>
                <h3>These peolpe are currently your friends</h3>
                <div>
                    {friends.map((friend) => (
                    <div className="user" key={friend.id}>
                        <div>
                        <img src={friend.image} />
                        </div>
                        <div>
                        <h3>{friend.first} {friend.last}</h3>
                        </div>
                    </div>))}
                </div>
        </div>
    )
}