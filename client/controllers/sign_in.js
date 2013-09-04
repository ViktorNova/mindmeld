SignInController = RouteController.extend({
  userLoadedAction: function() {
    if (!Meteor.user()) {
      this.render('signIn');
      this.render({
        publicHeader: {to: 'header'}
      });
    } else {
      this.render('waiting');
    }
  } 
});