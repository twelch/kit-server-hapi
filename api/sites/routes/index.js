const Sites = require('../util/siteFunctions')
const Joi = require('joi')
/*
 * Sites API - returns necessary app config for client
 */

/*
 * Get list of sites user has access to
 */
module.exports = [{
  method: 'GET',
  path: '/api/sites',
  config: {
    pre: [
      { method: Sites.getSites, assign: 'sites' }
    ],
    handler: function (request, reply) {
      reply(request.pre.sites)
    }
  }
},
{
  method: 'GET',
  path: '/api/sites/{site}',
  config: {
    pre: [
      { method: Sites.getSite, assign: 'site' }
    ],
    handler: function (request, reply) {
      reply(request.pre.site)
    },
    validate: {
      params: {
        site: Joi.string().min(1).max(20)
      }
    }
  }
}]
