SignUpController = RouteController.extend({
  userLoadedAction: function() {
    console.log(Meteor.user());
    if (Meteor.user()) {
      Router.go('home');
    } else {
      this.render('signUp');
    }
  } 
});