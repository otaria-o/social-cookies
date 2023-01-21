import { useState, useEffect } from 'react';
import { OtherProfile } from "../otherprofile/otherprofile"
import { FriendButton } from '../friendbutton/friendbutton';
import { Link } from "react-router-dom";

export function Friends ({ }) {

    const [ friends, setFriends ] = useState([])
    const [ almostFriends, setAlmostFriends ] = useState([])
    
    useEffect(() => {
        fetch("/friends")
        .then(res => res.json())
        .then(data => {   
            setFriends(data.friends),
            setAlmostFriends(data.almostFriends)
        })
    },[])

    return ( 
        <div className="peopleorfriends">
            { almostFriends.length > 0 && 
            <div>
            <h2>These peolpe want to be your friends</h2>
                <div>
                    {almostFriends.map((almostFriend) => (
                    <div className="user" key={almostFriend.id}>
                        <div>
                        <Link to={`/otheruser/${almostFriend.id}`}><img src={almostFriend.image} /></Link>
                        </div>
                        <div>
                        <h3>{almostFriend.first} {almostFriend.last}</h3>
                        </div> 
                        {/* <FriendButton otherUserId={almostFriend.id}/> */}
                    </div>))}                
                </div> 
            </div>}
            { friends.length > 0 && 
                <div>
                <h2>These peolpe are currently your friends</h2>
                <div>
                    {friends.map((friend) => (
                    <div className="user" key={friend.id}>
                        <div>
                        <Link to={`/otheruser/${friend.id}`}><img src={friend.image} /></Link>
                        </div>
                        <div>
                        <h3>{friend.first} {friend.last}</h3>
                        </div>
                        {/* <FriendButton otherUserId={friend.id}/> */}
                    </div>))}
                </div> 
            </div>}
        </div> 
    )
}