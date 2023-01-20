import { useState, useEffect } from 'react';
import { FriendButton } from '../friendbutton/friendbutton';
// import { OtherProfile } from "../otherprofile/otherprofile"
import { Link } from 'react-router-dom';

export function Friends ({ id }) {

    const [ friends, setFriends ] = useState([])
    const [ almostFriends, setAlmostFriends ] = useState([])
    
    const handleClick = (evt) => {
        evt.preventDefault()
 
}
   

    useEffect(() => {
        // console.log("otherUserId", otherUserId);
        fetch("/friends")
        .then(res => res.json())
        .then(data => {
            // Promise.all([
            //     // console.log("arrivano gli array?", data),
            //     setFriends(results.filter(result => result.accepted)),
            //     // console.log("array friends", friends),
            //     setAlmostFriends(results.filter(result => !result.accepted)),
            //     console.log("almostFriends", almostFriends)
            // ])
            
            setFriends(data.friends),
            setAlmostFriends(data.almostFriends)
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
                        <FriendButton otherUserId={almostFriend.id}/>
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
                        <FriendButton otherUserId={friend.id}/>
                    </div>))}
                </div>
        </div>
    )
}