'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

server.register({
    register: require('h2o2')
}, function (err) {
    if (err) {
        console.log('Failed to load h2o2');
    }
});

server.connection({ host: 'localhost', port: 3000 });

//Config API version 1
server.route({
    method: 'GET',
    path: '/api/1.0/config',
    handler: function (request, reply) {
        reply({name:'foo', map:'urban'});
    }
});

//Service API version 2 proxy
server.route({
    method: '*',
    path: '/api/2.0/{host}/{scope}/{service*}',
    handler: {
        proxy: {
          rejectUnauthorized: true,
          mapUri: function(request, callback){
            var url="https://"+request.params.host+"/2.0/"+request.params.scope+"//"+request.params.service+request.url.search
            console.log(url);
            console.log(request.method);
            console.log(request.url.search);
            callback(null, url);
          }
        }
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});