'use strict';

const Boom = require('boom');
const bcrypt = require('bcrypt');
const settings = require('../../../settings')
const getSubdomain = require('../../../util/request').getSubdomain
const pick = require('lodash/pick')

/*
 * getSite - get site from subdomain
 */
function getSite(request, reply) {
  const sitename = getSubdomain(request.info.hostname)
  if (!sitename) {
    return reply(Boom.badRequest('Invalid site, check the URL'))
  }  
  if (!settings.sites.hasOwnProperty(sitename)) {
    return reply(Boom.badRequest('Invalid site, check the URL'))
  }
  
  // Enhance and return new site object
  let site = Object.assign({}, settings.sites[sitename])
  site.id = sitename
  // Override view names with full view objects
  site.views = pick(settings.views, site.views)
  return reply(site)
}

module.exports = {
  getSite: getSite
}