// REDUCER

// export function friendsReducer(allFriends = [], action) {
//     console.log("friendsReducer action",action.action)
//     console.log("friendsReducer payload",action.payload)
//     switch (action.type) {
//         case "set-friends":
//             return action.payload.friends;
//         case "set-almostfriends":
//             return action.payload.almostFriends;
//     } 
//     return allFriends;
// }

export function friendsReducer(allFriends = [], action) {
    if (action.type === "set-all-friends") {
        return action.payload.allFriends
    }
    return allFriends
};
    
// ACTIONS:

// export function setFriends(friends) {
//     console.log("I am setFriends:", friends);
//     return {
//         type: "set-friends",
//         payload: { friends },
//     };
// }

// export function setAlmostFriends(almostFriends) {
//     return {
//         type: "set-almostfriends",
//         payload: { almostFriends },
//     };
// };

export function setAllFriends(allFriends) {
    return {
        type: "set-all-friends",
        payload: { allFriends },
    }
};

export function removeFriend(user) {
    return {
        type: "remove-friend",
        payload: { }
    }
}

