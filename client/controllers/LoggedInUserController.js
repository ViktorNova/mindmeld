LoggedInUserController = RouteController.extend({
  userLoadedAction: function() {

    if (Meteor.loggingIn())
      return;
    
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

      if (Meteor.user().emails[0].verified) {
        this.render(this.route.options.userFoundTemplate);
      } else {
        this.render('emailNotVerified');
      }
    } else {
      this.render(this.route.options.userNotFoundTemplate);
      this.render({
        publicHeader: { to: 'header'}
      });
    }
  } 
});