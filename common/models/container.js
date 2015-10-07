var imagemagick = require('imagemagick');

module.exports = function(Container) {

  Container.afterRemote('upload', function ( context, res, next )  {

    var file = res.result.files.file[0];
    var filePath = './server/storage/' + file.container + '/' + file.name;

    imagemagick.resize({
      srcPath: filePath,
      dstPath: filePath,
      quality: 0.7,
      width: 300,
      customArgs: ['-auto-orient', true]
    }, function(err) {
      next();
    });

  });

};
