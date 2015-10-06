var loopback = require('loopback');
var path = require('path');
var guid = require('easy-guid');
var _ = require('lodash');

module.exports = function (app) {

  var dataSourceConnector =  app.dataSources.storage.connector;

  _.extend(dataSourceConnector, {

    maxFileSize: 2097152, // <- 2MB
    // generate random file name to avoid conflicts
    getFilename: function (file) {

      var splittedName = file.name.split('.');
      var extension = '.' + splittedName[ splittedName.length - 1];

      var uniqueName = guid.new() + extension;

      return uniqueName;


    }
  });

}
