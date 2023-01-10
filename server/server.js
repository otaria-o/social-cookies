const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(cookieSession( {
    secret: `music will be the answer`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

// connecting files
const { addUser, checkEmail, insertCode, selectCode, updatePassword } = require("./sql/db.js")
const crypt = require("../bcrypt.js")

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
    // console.log("password di registrazione", req.body.password)
    //  hash the password before saving to the Database
    // add check in order to not to have empty input
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
});

app.post("/login", (req, res) => {
    checkEmail(req.body.email)
    .then(data => {
        if (data.rows.length === 1) {
            console.log("email", data.rows[0].email)
            console.log("password", data.rows[0].password)
            crypt.compare(req.body.password, data.rows[0].password)
            .then(bool => {
                if (bool) {
                    console.log("controllo password:", bool)
                    req.session.userId = data.rows[0].id
                    res.json({success: true})
                }    
            })
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
        if (data.rows.length === 1) {
            console.log("email", data.rows[0].email)
            const secretCode = cryptoRandomString({
            length: 6
            })
            insertCode(secretCode, data.rows[0].email)
            console.log("code", secretCode)
            console.log("email", data.rows[0].email)
        }  
    })
    .then(data => {
        console.log(data)
        res.json({success: true})
    })
    .catch(err => {
        console.log("error appeared for post req reset:", err);
        res.json({success: false})
    })
});

app.post("/reset/pwd", (req, res) => {
    selectCode(req.body.email)
    .then(data => {
        console.log("verifica il codice segreto", data)
        if (data.rows.length >= 1) {
            crypt.hash(req.body.password)
            .then(newPwd => {
                updatePassword(newPwd, req.body.email).then(data => {
                    console.log("successo?", data)
                   res.json({success: true})
                })
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

// GET
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
