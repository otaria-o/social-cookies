require("dotenv").config();

const { SQL_USER, SQL_PASSWORD } = process.env;
const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/socialnetwork`);


// addUser
exports.addUser = function(firstname, lastname, email, password) {
    return db.query(`INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`, [firstname, lastname, email, password])
}

// check for email
exports.checkEmail = function(email) {
    return db.query(`SELECT email, password, id FROM users WHERE email = $1;`, [email])
}

// insert into the table the secret code of the user who forgot the password
exports.insertCode = function(code, email) {
    return db.query(`INSERT INTO reset_codes (code, email) VALUES ($1,$2);`, [code, email])
}

// select the code that matches the email
exports.selectCode = function(email) {
    return db.query(`SELECT code from reset_codes where email = ($1) AND timestamp > current_timestamp - interval '10 minutes';`, [email])
}

// update password after the reset
exports.updatePassword = function(password, email) {
    return db.query(`UPDATE users SET password = $1 where email = $2;`, [password, email])
}

// update image
exports.updateImg = function(image, id) {
    return db.query(`UPDATE users SET image = $1 where id = $2 RETURNING *;`, [image, id])
}

// get all the info from users table
exports.getAllInfo = function(userId) {
    return db.query(`SELECT * FROM users WHERE id = $1;`, [userId])
}

// insert bio
exports.updateBio = function(bio, userId) {
    return db.query(`UPDATE users SET bio = $1 WHERE id = $2 RETURNING *;`, [bio, userId])
}

// get the last four people
exports.getFour = function() {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3 RETURNING *;`)
}

// search for people
exports.getMatchingUsers = function(val) {
    return db.query(`SELECT * FROM users WHERE first ILIKE $1 OR last ILIKE $1;`, [val + '%']);
}

