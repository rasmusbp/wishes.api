var imagemagick = require('imagemagick');

function getScaledImageDimensions( width, height, orientation ) {

    var targetWidth = 300;
    var isRotated = orientation === 'RightTop';

    var trueWidth = (isRotated) ? height : width,
        trueHeight = (isRotated) ? width : height,
        factor = (trueWidth / trueHeight) * targetWidth;

    return {
      width: (isRotated) ? (trueWidth * factor) : targetWidth,
      height: (isRotated) ? targetWidth : (trueHeight * factor)
    }

}

module.exports = function(Container) {

  Container.afterRemote('upload', function ( context, res, next )  {

    var file = res.result.files.file[0];
    var filePath = './server/storage/' + file.container + '/' + file.name;

    imagemagick.identify(filePath, function(err, features){

      var scaledDimensions = getScaledImageDimensions(
        features.width,
        features.height,
        features.orientation
      );

      imagemagick.resize({
        srcPath: filePath,
        dstPath: filePath,
        quality: 0.8,
        width: scaledDimensions.width,
        height: scaledDimensions.height,
        customArgs: ['-auto-orient', true]
      }, function(err) {
        next();
      });

    });



  });

};
