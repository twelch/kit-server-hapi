const Boom = require('boom')
const settings = require('../../../settings')
const getSite = require('../util/siteFunctions').getSite

/*
 * App config API - returns necessary app config for client
 */
module.exports = {
  method: 'GET',
  path: '/api/sites',
  config: {
    pre: [
      { method: getSite, assign: 'site' }
    ],
    handler: function (request, reply) {    
      reply(request.pre.site)
    }
  }
}