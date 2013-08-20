VerifyEmailController = RouteController.extend({
  tokenValidAction: function(token) {
    console.log('checking ' + token);
    this.render('verifyEmail');
  } 
});