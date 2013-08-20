SignOutController = RouteController.extend({
  signOutAction: function() {
    this.render('waiting');
    if (Meteor.user()) {
      Meteor.logout(function(error) {
        Router.go('home');
      });
    } else {
      Router.go('home');
    }
  } 
});