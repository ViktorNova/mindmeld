AcceptEmailInviteController = RouteController.extend({
  acceptEmailInvite: function() {

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
    } else {
      this.render({
        publicHeader: {to: 'header', data: {}}
      });          
    }

    this.render('acceptEmailInvite');
  }
});