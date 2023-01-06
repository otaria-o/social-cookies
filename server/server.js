const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;
const cookieSession = require("cookie-session");

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(cookieSession( {
    secret: `music will be the answer`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

// connecting files
const { addUser, checkEmail } = require("./sql/db.js")
const crypt = require("../bcrypt.js")
const { sesEmail } = require("./ses.js")

// GET
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
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
        // console.log("query", data.rows)
        if (data.rows.length === 1) {
            // console.log("email", data.rows[0].email)
            // console.log("password", data.rows[0].password)
            crypt.compare(req.body.password, data.rows[0].password)
            .then(bool => {
                // console.log("controllo password", bool)
                if (bool) {
                    console.log("id users", data.rows[0].id)
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
})


app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
