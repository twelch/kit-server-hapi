'use strict';

const Boom = require('boom');
const bcrypt = require('bcrypt');
const settings = require('../../../settings')
const getSubdomain = require('../../../util/request').getSubdomain

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
function verifyCredentials(request, reply) {
  // Find site and verify registered
  const sitename = getSubdomain(request.info.hostname)
  if (!sitename) {
    return reply(Boom.badRequest('Invalid site, check the URL'))
  }  
  if (!settings.sites.hasOwnProperty(sitename)) {
    return reply(Boom.badRequest('Invalid site, check the URL'))
  }

  // Find user and verify registered
  const password = request.payload.password
  const user = getUserByName(request.payload.username)
  if (!user) {
    return reply(Boom.badRequest('Incorrect username'))
  }

  // Verify user has access to site
  const hasAccess = checkUserSiteAccess(user, sitename)
  if (!hasAccess) {
    return reply(Boom.badRequest('You do not have access to this site'))
  }

  // Verify password match
  const hash = getHashById(user.id)
  bcrypt.compare(password, hash, (err, isValid) => {
    if (!isValid) {
      return reply(Boom.badRequest('Incorrect password'))
    }
    // Success
    return reply(user)
  })
}

/*
 * verifySession - given decoded request token, verify not expired and user account still exists
 */
function verifySession(decoded, request, callback) {
  if (decoded.username) {
    // Verify token userid matches a real userid
    const user = getUserByName(decoded.username)
    if (user && decoded.id === user.id && decoded.username === user.username) {
      return callback(null, true);
    }
  }
  return callback(null, false);
}

/****** User Query Functions ******/

function getUserByName(username) {
  return settings.users.find((user) => { 
    return user.username === username
  })
}

function getHashById(userid) {
  const password = settings.passwords.find((rec) => { 
    return rec.userid == userid;
  })
  if (password) {
    return password.hash
  } else {
    return false;
  }
}

function checkUserSiteAccess(user, sitename) {
  if (!user.sites) {
    return false
  }
  const siteMatch = user.sites.find((usersite) => {
    return (usersite === sitename)
  })
  if (siteMatch) {
    return true
  } else {
    return false 
  }
}

module.exports = {
  hashPassword: hashPassword,
  verifyCredentials: verifyCredentials,
  verifySession: verifySession
}