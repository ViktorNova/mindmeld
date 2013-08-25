VerifyEmailTokenController = RouteController.extend({
  verifyToken: function() {
    this.render('waiting');

    if (Meteor.user()) {

      this.render({
        userHeader: { 
          to: 'header', 
          data: function() {
            return {
              otherMembers: null,
              username: Meteor.user().username
            }
          }
        }
      });
    } else {
      this.render({
        publicHeader: {to: 'header', data: {}}
      });          
    }

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