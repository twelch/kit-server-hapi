'use strict';

const Boom = require('boom');
const bcrypt = require('bcrypt');
const settings = require('../../../settings')
const getSubdomain = require('../../../util/request').getSubdomain
const pick = require('lodash/pick')

/*
 * getSites - get all user istes
 */
function getSites(request, reply) {
  // Enhance and return new site object
  const sites = { sites: request.auth.credentials.sites }  
  return reply(sites)
}

/*
 * getSite - get site from subdomain
 */
function getSite(request, reply) {
  // Verify legit request
  const sitename = request.params.site  
  if (!sitename) {
    return reply(Boom.badRequest('Site not provided, check the URL'))
  } 
  if (!settings.sites.hasOwnProperty(sitename)) {
    return reply(Boom.badRequest('Invalid site, check the URL'))
  }
  
  const hasSiteAccess = checkUserSiteAccess(request.auth.credentials, sitename)
  if (!hasSiteAccess) {
    return reply(Boom.unauthorized('Unauthorized'))
  }

  // Enhance and return new site object
  let site = Object.assign({}, settings.sites[sitename])
  site.id = sitename
  // Override view names with full view objects
  site.views = pick(settings.views, site.views)
  return reply(site)
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
  getSites: getSites,
  getSite: getSite
}