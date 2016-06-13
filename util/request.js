'use strict';

const Boom = require('boom');
const bcrypt = require('bcrypt');
const settings = require('../settings')

// Site name expected to be second subdomain e.g. site1.app.example.com
function getSubdomain(hostname) {
  const subdomainRegex = new RegExp(/(?:http[s]*\:\/\/)*(.*?)\.(.*?)\.(?=[^\/]*\..{2,5})/i)
  const subParts = subdomainRegex.exec(hostname)
  if (!subParts || subParts.length < 3) {
    return false;
  } else {
    return subParts[1]
  }
}

module.exports = {
  getSubdomain: getSubdomain
}