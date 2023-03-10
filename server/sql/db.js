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
    return db.query(`INSERT INTO reset_codes (code, email) VALUES ($1, $2);`, [code, email])
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

// get the last three people
exports.getThree = function(id) {
    return db.query(`SELECT * FROM users WHERE id != $1 ORDER BY id DESC LIMIT 3;`, [id])
}

// search for people
exports.getMatchingUsers = function(val, id) {
    return db.query(`SELECT * FROM users WHERE id != $2 AND (first ILIKE $1 OR last ILIKE $1) LIMIT 5;`, [val + '%', id]);
}

//
exports.findFriendship = function(user1, user2) {
    return db.query(`
        SELECT * FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)
    ;`, [user1, user2]);
};

// insert in friendships table
exports.insertFriendship = function(user1, user2) {
    return db.query(`INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) RETURNING *;`, [user1, user2]);
};

// friendbutton component - update a friendship from f to t  
exports.updateFriendshipTrue = function(user1, user2) {
    return db.query(`UPDATE friendships SET accepted = TRUE WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1) RETURNING *;`, [user1, user2]);
};

// friendbutton component - when someone end a friendship
exports.cancelFriendship = function(user1, user2) {
    return db.query(`DELETE from friendships 
    WHERE (sender_id = $1 AND recipient_id = $2)
    OR (sender_id = $2 AND recipient_id = $1)
    ;`, [user1, user2])
};

exports.findFriendsOrWhoWantsToBe = function(id) {
    return db.query(`SELECT u.id, u.first, u.last, u.image, f.recipient_id, f.sender_id, f.accepted FROM users as u JOIN friendships as f ON 
    ((f.sender_id = u.id) AND (recipient_id = $1) AND (accepted = FALSE))
    OR ((f.sender_id = u.id) AND (f.recipient_id = $1) AND (f.accepted = TRUE))
    OR ((f.recipient_id = u.id) AND (f.sender_id = $1) AND (f.accepted = true))
    ;`, [id])
};

exports.getLatestMessages = () => {
    return db.query( `
        SELECT * FROM (
            SELECT m.id, m.message, m.created_at,
                u.first, u.last, u.image 
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            ORDER BY m.created_at DESC
            limit 10
        ) as results ORDER BY created_at ASC
    ;`);
};

exports.insertMessage = (senderId, message) => {
    return db.query(`INSERT into messages (sender_id, message) VALUES ($1, $2) RETURNING *;`, [senderId, message]);
}


