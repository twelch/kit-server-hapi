'use strict';

const Boom = require('boom');
const bcrypt = require('bcrypt');
const settings = require('../../../settings')

/*
 * hashPassword - returns an encrypted hash of the given password
 */
function hashPassword(password, cb) {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash, salt);
    });
  });
}

/*
 * verifyCredentials - given username and password, verifies the password and returns user object
 */
function verifyCredentials(req, res) {
  const password = req.payload.password
  
  // Find user and hash
  const user = getUserByName(req.payload.username)
  const hash = getHashById(user.id)

  if (user) {
    bcrypt.compare(password, hash, (err, isValid) => {
      if (isValid) {
        res(user)
      }
      else {
        res(Boom.badRequest('Incorrect password!'))
      }
    })
  } else {
    res(Boom.badRequest('Incorrect username'))
  }
}

/*
 * verifySession - given decoded request token, verify not expired and user account still exists
 */
function verifySession(decoded, request, callback) {
  if (decoded.username) {
    const user = getUserByName(decoded.username)
    if (user && decoded.id == user.id) {
      return callback(null, true);
    }
  }
  return callback(null, false);
}

/****** User Query Functions ******/

function getUserByName(username) {
  return settings.users.find((user) => { 
    return user.username == username
  })
}

function getHashById(userid) {
  const password = settings.passwords.find((user) => { 
    return user.id == userid;
  })
  if (password) {
    return password.hash
  } else {
    return false;
  }
}

module.exports = {
  hashPassword: hashPassword,
  verifyCredentials: verifyCredentials,
  verifySession: verifySession
}