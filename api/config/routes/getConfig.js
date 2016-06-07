const settings = require('../../../settings')

/*
 * App config API - returns necessary app config for client
 */
module.exports = {
  method: 'GET',
  path: '/api/config',
  handler: function (request, reply) {
    reply({
      services: {
        server: settings.services.server,
        readKey: settings.services.readKey
      },
      views: settings.views
    })
  }
}