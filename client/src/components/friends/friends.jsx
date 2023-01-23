import { useState, useEffect } from 'react';
import { OtherProfile } from "../otherprofile/otherprofile"
import { FriendButton } from "../friendbutton/friendbutton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAllFriends } from "../../redux/friends.slice"

export function Friends ({ }) {

    const dispatch = useDispatch();
    const allFriends = useSelector((store) => store.allFriends);
    
    const friends = allFriends.filter(allFriend => allFriend.accepted)
    const almostFriends = allFriends.filter(allFriend => !allFriend.accepted)

    useEffect(() => {
        fetch("/friends")
        .then(res => res.json())
        .then(allFriends => {   
            console.log("dove sono i miei amici?", allFriends)
            dispatch(setAllFriends(allFriends))
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
                        <div className="dati">
                        <h3>{almostFriend.first} {almostFriend.last}</h3>
                        <FriendButton otherUserId={almostFriend.id}/>
                        </div>     
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
                        <div className="dati">
                        <h3>{friend.first} {friend.last}</h3>
                        <FriendButton otherUserId={friend.id}/>
                        </div> 
                    </div>))}
                </div> 
            </div>}
        </div> 
    )
}