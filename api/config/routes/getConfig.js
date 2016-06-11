const Boom = require('boom')
const settings = require('../../../settings')
const pick = require('lodash/pick')

/*
 * App config API - returns necessary app config for client
 */
module.exports = {
  method: 'GET',
  path: '/api/config',
  handler: function (request, reply) {
    const expression = new RegExp(/(?:http[s]*\:\/\/)*(.*?)\.(.*?)\.(?=[^\/]*\..{2,5})/i)
    const parts = expression.exec(request.info.hostname)
    if (!parts || parts.length < 3) {
      return reply(Boom.badRequest('Invalid site'))
    }
        
    const sitename = parts[1]
    console.log('subdomain: '+sitename)
    let views = null;
    if (settings.sites.hasOwnProperty(sitename)) {
      views = pick(settings.views, settings.sites[sitename].views);
    } else {
      return reply(Boom.badRequest('Invalid site'))
    }

    reply({
      views: views
    })
  }
}