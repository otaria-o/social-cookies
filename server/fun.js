

    exports.setFriendshipStatus = function(data) {
        let friendship;
        let userId;
        if (!data) {
            console.log("hallo")
            return friendship = "not"
        } else if (data.accepted === true) {
                return friendship = "yes"
            } else if (data.accepted === false) {
                if (data.sender_id === userId) {
                    console.log("pendent")
                    return friendship = "pendentbysender_id"   
                } else {
                    return friendship = "pendentbyOtherUser"
                    }
            }
    }

  

    exports.setButtonText = function(friendship) {
        let msgbutton;
        if (friendship = "not") {
            return msgbutton = "Make friend request"
        } else if (friendship = "yes") {
            return msgbutton = "End friendship"
            } else if (friendship = "pendentbysender_id") {
                return msgbutton = "Cancel request" 
                } else if (friendship = "pendentbyOtherUser") {
                    return msgbutton = "Accept friend request"
                    }
        }       


exports.setFriendshipStatus = function(data) {
switch (friendship) {
    case !data :
        return friendship = "not"
        break;
    case data.accepted === true :
        return friendship = "yes"
        break;
    case data.sender_id === req.session.userId :
        return friendship = "pendentbysender_id"
        break;
    case data.accepted === false :
        return friendship = "pendentbyOtherUser"
        break;
}
}




