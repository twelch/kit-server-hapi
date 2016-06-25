'use strict'

const Boom = require('boom')
const settings = require('../../../settings')
const pick = require('lodash/pick')
const clonedeep = require('lodash.clonedeep')
/*
 * getSites - get all user sites
 */
function getSites (request, reply) {
  // Copy sites and views
  let sites = clonedeep(settings.sites)
  let views = clonedeep(settings.views)
  // Pick out sites user has access to
  sites = pick(sites, request.auth.credentials.sites)
  Object.keys(sites).forEach((siteid) => {
    // Swap view ids for each site with full view objects
    let curSite = sites[siteid]
    curSite.id = siteid
    curSite.views = curSite.views.map((viewname) => {
      return views.find((view) => view.id === viewname)
    })    
  })
  return reply(sites)
}

/*
 * getSite - get site from subdomain
 */
function getSite (request, reply) {
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

function checkUserSiteAccess (user, sitename) {
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
