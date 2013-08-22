VerifyEmailTokenController = RouteController.extend({
  verifyToken: function() {
    this.render('waiting');
    this.render({
      publicHeader: {to: 'header'}
    });

    var routeContext = this;

    Accounts.verifyEmail(this.params.emailVerificationToken, function(error) {
      if (error) {
        routeContext.data['error'] = error;
        routeContext.render('error');
      } else {
        routeContext.render('emailVerified');
      }
    });
  } 
});