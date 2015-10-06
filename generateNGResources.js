var generateServices = require('loopback-sdk-angular').services;
var app = require('./server/server');

var client = generateServices(app, 'resources', '/api');
require('fs').writeFileSync('./ng-tmp/resources.js', client, 'utf-8');

process.exit();
