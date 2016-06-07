'use strict';

const Boom = require('boom')
const authenticateUserSchema = require('../schemas/authenticateUser')
const verifyCredentials = require('../util/userFunctions').verifyCredentials
const createToken = require('../util/token')

module.exports = {
  method: 'POST',
  path: '/api/users/authenticate',
  config: {
    auth: false,
    // Check the user's password
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (req, res) => {
      // If the user's password is correct, we can issue a token.
      // If it was incorrect, the error will bubble up from the pre method
      res({ token: createToken(req.pre.user) }).code(201);
    },
    validate: {
      payload: authenticateUserSchema
    }
  }  
}