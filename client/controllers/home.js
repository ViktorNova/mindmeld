HomeController = RouteController.extend({
  userLoadedAction: function() {
    if (Meteor.user()) {
      this.render('home');
    } else {
      this.render('homePublic');
    }
  } 
});