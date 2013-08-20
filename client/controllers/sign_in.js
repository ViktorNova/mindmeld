SignInController = RouteController.extend({
  userLoadedAction: function() {
    if (Meteor.user()) {
      Router.go('home');
    } else {
      this.render('signIn');
    }
  } 
});