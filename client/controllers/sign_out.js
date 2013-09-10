SignOutController = RouteController.extend({
  signOutAction: function() {
    this.render('waiting');
    if (Meteor.user()) {
      SessionAmplify.set('following',null);
      Meteor.call('followUserId',null);
      Meteor.logout(function(error) {
        Router.go('home');
      });
    } else {
      Router.go('home');
    }
  } 
});