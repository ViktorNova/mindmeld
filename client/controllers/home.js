HomeController = RouteController.extend({
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
        this.render('home');
      } else {
        this.render('emailNotVerified');
      }

    } else {
      this.render('homePublic');
      this.render({
        publicHeader: { to: 'header'}
      });
    }
  } 
});