SignUpController = RouteController.extend({
  userLoadedAction: function() {
    if (Meteor.user()) {
      Router.go('home');
    } else {
      this.render('signUp');
      this.render({
        publicHeader: {to: 'header'}
      });
    }
  } 
});