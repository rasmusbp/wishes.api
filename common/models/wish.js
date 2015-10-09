var loopback = require('loopback');

module.exports = function(Wish) {

  Wish.observe('access', function filterActive(ctx, next) {

    var context = loopback.getCurrentContext();
    var currentUser = context && context.get('currentUser');

    if ( !currentUser ) {
      ctx.query.where = ctx.query.where || {};
      ctx.query.where.isActive = true;
    }

    next();

  });
  
  Wish.observe('before save', function(ctx, next) {
    if ( ctx.data ) {
      ctx.data.modifiedDate = new Date();
    }
    next();
  });

};
