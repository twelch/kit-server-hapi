Kit Server Hapi
=======================

#Goal

Build a simple multi-tenant server application using Hapi.JS configured with: 
* Token-based Authentication (jwt)
* Simple REST API for fetching site configuration
* Minimal file-based user and site management, ready to be swapped in with the solution of your choice
* Internationalization with use of Accept-language header

This application is meant to be accessed solely via the REST API and it's /api endpoint.  It is designed to be published under a single domain alongside [kit-client-react](https://github.com/twelch/kit-client-react) which provides a single-page-app (SPA) user experience.

## Features
* [hapi](http://hapijs.com/)
* [hapi-auth-jwt-2](https://github.com/dwyl/hapi-auth-jwt2)
* [hapi-accept-language](https://github.com/opentable/hapi-accept-language)

## Requirements
* node `^6.2.0` for use of basic es2015 language features though earlier could work
* npm `^3.0.0`

## Install

$ cd into top-level directory

```
$ npm install
```

## Configuration

Settings can be found in `settings/settings.js`.  

1. Register a Mapbox account and generate your own readonly key.  Enter as token for each view
2. `npm start`

The server app should now be listening on port 3001

## Production

The settings file has some reasonable defaults but before publishing this application publicly you must generate a new secret key and user account passwords at the very least so that the user account and web tokens are not compromised.

1. Generate and set the secret key
  # `npm run gensecret`
2. Create and set new users and passwords.
  # `npm run genhash yourpassword`
  # Enter a new user record and matching password record with the generated has
  # Yes this system is very rudimentary

### PM2

PM2 is a great production process manager for the Node environment.  You should install it on your system and then start the server process

```pm2 start server``` 

`server` simple refers to the server.js filename

If you make code changes or upgrade versions you will need to restart the process

```pm2 restart server```

### NGINX or other

By default the application will listen on port 3001 and is setup to be published together under the same domain with `kit-server-client`.  The easiest way to make this work is to use a web server like NGINX to reverse proxy requests from port 80/443 to port 3001.  See the documentation for the client to see how to configure it with NGINX.

```
# Server app reverse proxy
location /api {
  proxy_pass http://127.0.0.1:3000;
}
```