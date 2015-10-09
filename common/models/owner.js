var loopback = require('loopback');

module.exports = function(Owner) {

  Owner.observe('access', function filterActive(ctx, next) {

    var context = loopback.getCurrentContext();
    var currentUser = context && context.get('currentUser');

    if ( !currentUser ) {
      ctx.query.where = ctx.query.where || {};
      ctx.query.where.isActive = true;
    }

    next();

  });

};
