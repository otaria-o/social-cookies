const setFriendshipAndTextButton = function(data) {
    if (!data.rows[0]) {
        console.log("hallo")
        res.json({
            friendship : "not",
            msgbutton : "Make friend request"
        })
        } else if (data.rows[0].accepted === true) {
            res.json({
                friendship : "yes",
                msgbutton : "End friendship"
            })
            } else if (data.rows[0].recipient_id === otherUserId && data.rows[0].sender_id === req.session.userId) {
            console.log("pendent")
            res.json({
                friendship : "pendentbysender_id",
                msgbutton : "Cancel request"    
            })
            } else if (data.rows[0].accepted === false) {
                res.json({
                    friendship : "pendentbyOtherUser",
                    msgbutton : "Accept friend request"
                })
                }
}  
