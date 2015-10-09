var loopback = require('loopback');
module.exports = function (app) {

  app.use(loopback.context());
  app.use(loopback.token());

  app.use(function (req, res, next) {

    if (!req.accessToken) return next();

    app.models.MyUser.findById(req.accessToken.userId, function(err, user) {
      if (err) return next(err);
      res.locals.currentUser = user;
      var loopbackContext = loopback.getCurrentContext();
      if (loopbackContext) loopbackContext.set('currentUser', user);
      next();
    });

  });

}
