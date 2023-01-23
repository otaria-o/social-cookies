const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000"))
});

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
const cookieSessionMiddleware = cookieSession({
    secret: `music will be the answer`,
    maxAge: 1000 * 60 * 60 * 24 * 14
});
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// connecting files
const { addUser, checkEmail, insertCode, selectCode, updatePassword, updateImg, updateBio, getAllInfo, getThree, getMatchingUsers, findFriendship, cancelFriendship, insertFriendship, updateFriendshipTrue, findFriendsOrWhoWantsToBe, getLatestMessages, insertMessage } = require("./sql/db.js")
const crypt = require("../bcrypt.js")
const { uploader, fileUpload } = require("./uploads/upload.js")

app.use((req, res, next) => {
    console.log("---------------------");
    console.log("req.url:", req.url);
    console.log("req.method:", req.method);
    console.log("req.session:", req.session);
    console.log("req.body:", req.body);
    console.log("---------------------");
    next();
});


// POST
app.post("/register", (req, res) => {
    // add check in order to not to have empty input
    if (req.body.firstname === "" || req.body.lastname === "" || req.body.email === "" || req.body.password === "") {
        res.json({success: false})
    } else {
        crypt.hash(req.body.password)
        .then(hashedPsw => {
        console.log(hashedPsw)
        return addUser(req.body.firstname, req.body.lastname, req.body.email, hashedPsw)
        })
        .then(data => {
        console.log("data", data)
        req.session.userId = data.rows[0].id
        console.log("stanno funzionando i biscotti?", req.session.userId)
        res.json({success: true})
        })
    .catch(err => {
        console.log("error appeared for post req register:", err);
        res.json({success: false})
        })
    }
});

app.post("/login", (req, res) => {
    checkEmail(req.body.email)
    .then(data => {
        console.log(data)
        if (data.rows.length === 1) {
            console.log("email", data.rows[0].email)
            console.log("password", data.rows[0].password)
            crypt.compare(req.body.password, data.rows[0].password)
            .then(bool => {
                if (bool) {
                    console.log("controllo password:", bool)
                    req.session.userId = data.rows[0].id
                    res.json({success: true})
                } else {
                    res.json({success:false})
                } 
            })
        } else {
            res.json({success:false})
        }
    })
    .catch(err => {
        console.log("error appeared for post req login:", err);
        res.json({success: false})
    })
});

app.post("/reset", (req, res) => {
    console.log("req body ho dimenticato la psw", req.body)
    checkEmail(req.body.email)
    .then(data => {
        console.log(data.rows)
        if (data.rows.length === 1) {
            console.log("email", data.rows)
            const secretCode = cryptoRandomString({
            length: 6
            })
            insertCode(secretCode, data.rows[0].email)
            console.log("code", secretCode)
            console.log("email", data.rows[0].email)
            res.json({success: true})
        }  else {
            res.json({success:false})
        }
    })
    .catch(err => {
        console.log("error appeared for post req reset:", err);
        res.json({success: false})
    })
});

app.post("/reset/pwd", (req, res) => {
    checkEmail(req.body.email)
    .then(data => {
        if (data.rows.length === 1) {
            selectCode(req.body.email)
            .then(data => {
                console.log("codice?", data.rows)
                if (data.rows.length === 0) {
                    res.json({success: false})
                } else if (data.rows[0].code !== req.body.code) {
                    res.json({success: false})
                } else {
                    console.log("verifica il codice segreto", data)
                    // for (i=0; i<data.rows.length; i++) {
                    //     if (data.rows[i].code === req.body.code) {
                    crypt.hash(req.body.password)
                    .then(newPwd => {
                        updatePassword(newPwd, req.body.email)
                        .then(data => {
                            console.log("successo?", data)
                            res.json({success: true})
                            })
                        })
                    }
            })
        } else {
            res.json({success: false})
        }
    }) 
    .catch(err => {
        console.log("error appeared for post req reset:", err);
        res.json({success: false})
    })
});

app.post("/upload", uploader.single("pic"), fileUpload, (req, res) => {
    console.log("uploading!", "req.body:", req.body)
    if (req.file) {
        const url = res.locals.fileUrl;
        updateImg(url, req.session.userId)
        .then(data => {
            console.log("devo estrarre il link della foto", data.rows)
            res.json(data)        
        }) 
        .catch(err => {
            console.log("error appeared for POST IMG:", err);
        })         
    } 
});

app.post("/bio", (req, res) => {
    console.log("corpo di mille balene", req.body)
    updateBio(req.body.bio, req.session.userId)
    .then(data => {
        console.log("data dal server", data)
        res.json(data.rows[0])
    
    })
    .catch(err => {
        console.log("error appeared for post req BIO:", err);
        res.json({success: false})
    })
});

// FRIENDBUTTON 
app.post("/user/friendrequest/:otherUserId", (req, res) => {
    const otherUserId = req.params.otherUserId
    console.log(req.body)

    // action: cancel if there is a friendship and a user wants to end it or if the sender cancel his request
    if (req.body.friendship === "yes" || req.body.friendship === "pendingbysender_id") {
        cancelFriendship(req.session.userId, otherUserId)
        .then(result => {
            console.log(result)
            res.json(result)
        })    
        .catch(err => {
            console.log("error appeared for AMICIZIAREQ:", err)
            res.json({success:false})
        })  
    } 
    
    // action: insert: if there is no friendship insert the frienship request into the table
    else if (req.body.friendship === "not") {
        insertFriendship(req.session.userId, otherUserId) 
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(err => {
            console.log("error appeared for AMICIZIAREQ:", err)
            res.json({success:false})
        })  
        } 
        
        // action: update false to true if a frienship is accepted
        else if (req.body.friendship === "pendingbyOtherUser") {
            updateFriendshipTrue(req.session.userId, otherUserId)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log("error appeared for AMICIZIAREQ:", err)
                res.json({success:false})
            })  
        }
})

app.post("/logout", (req,res) => {
    req.session.userId = null
    console.log("sei stato loggato fuori")
    res.json({success: true})
});


// GET

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId
    });
});

// profile componente
app.get("/user", (req, res) => {
    getAllInfo(req.session.userId)
    .then(data => {
        console.log("getAllInfo", data.rows[0])
        res.json(data.rows[0])
    })
})

// get the last three registered users but not the current user
app.get("/users", (req, res) => {
    getThree(req.session.userId)
    .then( data => {
        // console.log("gli ultimi tre utenti iscritti", data)
        res.json(data.rows)
    })
    .catch(err => {
        console.log("error appeared for POST:", err)
        res.json({success:false})
    })  
})

// get per la possibilitä di cercare utenti attraverso l'input field del find people component
app.get("/search", (req, res) => {
    // console.log(req.query)
    getMatchingUsers(req.query.q, req.session.userId)
    .then(data => {
        // console.log("data per il matching", data)
        res.json(data.rows)
    })
    .catch(err => {
        console.log("error appeared for POST search:", err);
        res.json({success: false})
    })        
});


// friendbutton
app.get("/user/friend/:otherUserId", (req, res) => {
    // console.log("arriva al server l'altro user?", req.params.otherUserId)
    // console.log("arriva il corrente user?", req.session.userId)
    const otherUserId = req.params.otherUserId 
    findFriendship(req.session.userId, otherUserId)
    .then(data => {
        // console.log("data per l'amicizia", data)

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
                } else if (data.rows[0].sender_id === req.session.userId) {
                console.log("pending")
                res.json({
                    friendship : "pendingbysender_id",
                    msgbutton : "Cancel request"    
                })
                } else if (data.rows[0].accepted === false) {
                    res.json({
                        friendship : "pendingbyOtherUser",
                        msgbutton : "Accept friend request"
                    })
                    }
    }) 
    .catch(err => {
        console.log("error appeared for GET amicizia:", err);
        res.json({success: false})
    })        
});

// otherprofile component
app.get("/user/:otherUserId", (req, res) => {
    console.log("arriva al server?", req.params.otherUserId )
    const otherUserId = req.params.otherUserId 
    getAllInfo(otherUserId)
    .then(data => {
        console.log("data per OTHERPROFILE", data.rows)
        // se non esiste l'utente mandare un replace: true da gestire con messaggio utente non trovato
        if (data.rows.length === 0) {
            res.json({replace: true})
        } else {
            res.json(data.rows[0])
            }   
    })
    .catch(err => {
        console.log("error appeared for GET otherprofile:", err);
        res.json({success: false})
    })   
})

// friends component
app.get("/friends", (req, res) => {
    findFriendsOrWhoWantsToBe(req.session.userId)
    .then(data => {
        console.log(data.rows)
        if (!data.rows) {
            res.json({success: false})
        } else {
            // let results = data.rows
            // let friends = results.filter(result => result.accepted)
            // // console.log("array friends", friends)
            // let almostFriends = results.filter(result => !result.accepted)
            // // console.log("almostFriends", almostFriends)
        
            // res.json({friends, almostFriends }) 
            res.json(data.rows)
        }
    })
    .catch(err => {
        console.log("error appeared for GET FRIENDS PROFILE:", err);
        res.json({success: false})
    })   
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});


// SOCKET

io.on("connection", async (socket) => {
    console.log("[social:socket] incoming socket connection", socket.id);
    const { userId } = socket.request.session;
    if (!userId) {
        return socket.disconnect(true);
    } else {

        console.log("new connection", userId)
    // retrieve the latest 10 messages
        const latestMessages = getLatestMessages()
        .then(messages => {
            console.log(messages)
            // and send them to the client who has just connected
            socket.emit("chatMessages",  messages.rows ); 
        })
    }
    // listen for when the connected user sends a message
    socket.on("chatMessage", async (text) => {
       // store the message in the db
       console.log("texttext", text)
       const newMessage = await insertMessage(userId, text)

       // then broadcast the message to all connected users (included the sender!)
       // hint: you need the sender info (name, picture...) as well
       // how can you retrieve it?
       io.emit('chatMessage', newMessage.rows[0]);
    });
});

