// REDUCER

export function friendsReducer(allFriends = [], action) {
    switch (action.type) {
     case "set-all-friends": 
        return action.payload.allFriends;
    case "remove-friend":
        return allFriends.filter((allFriend) => { 
            if (action.payload.id !== allFriend.id) { 
                return allFriends } 
            })
    case "add-friend":
        return [...allFriends, action.payload.id];
    }
    return allFriends
};
    
// ACTIONS:

export function setAllFriends(allFriends) {
    return {
        type: "set-all-friends",
        payload: { allFriends },
    }
};

export function removeFriend() {
    return {
        type: "remove-friend",
        payload: {  }
    }
}

export function addFriend(otherUserId) {
    return {
        type: "add-friend",
        payload: { otherUserId }
    }
}
