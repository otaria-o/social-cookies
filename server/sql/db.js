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
    return db.query(`INSERT INTO reset_codes (code) VALUE ($1) WHERE email = $2;`, [code, email])
}

// select the code that matches the email

