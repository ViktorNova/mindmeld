VerifyEmailController = RouteController.extend({
  tokenValidAction: function(token) {
    this.render('verifyEmail');
  } 
});