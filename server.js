'use strict'

const Hapi = require('hapi')
const settings = require('./settings')
const glob = require('glob')
const path = require('path')
const port = process.env.PORT || 3000
const verifySession = require('./api/users/util/userFunctions').verifySession

var server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: port,
  routes: { cors: true },
  router: { stripTrailingSlash: true }
})

/* LANGUAGE */
server.register(require('hapi-accept-language'), function(err){
  if(err){ throw err }
})

/* AUTH */
server.register(require('hapi-auth-jwt2'), function (err) {
  if (err) console.log(err)

  server.auth.strategy('jwt', 'jwt', {
    key: settings.secret,
    validateFunc: verifySession,
    verifyOptions: { algorithms: [ 'HS256' ] }
  })
  server.auth.default('jwt') // Require token for all requests, override per route
})

/* PROXY */
server.register({
  register: require('h2o2')
}, function (err) {
  if (err) {
    console.log('Failed to load h2o2')
  }
})

/* ROUTES */
glob.sync('api/**/routes/*.js', {
  root: __dirname
}).forEach(file => {
  const route = require(path.join(__dirname, file))
  server.route(route)
})

server.start(function () {
  console.log('Server running at:', server.info.uri)
})
