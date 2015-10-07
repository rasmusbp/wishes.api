module.exports = function(Wish) {

  Wish.observe('before save', function(ctx, next) {
    if ( ctx.data ) {
      ctx.data.modifiedDate = new Date();
    }
    next();
  });

};
