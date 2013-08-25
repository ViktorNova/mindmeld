Template.acceptEmailInvite.helpers(Meteor.userFunctions);

var dataContext;

Template.acceptEmailInvite.rendered = function() {
  dataContext = this;
}

Template.acceptEmailInvite.events({
  'click #accept': function(event) {
    event.preventDefault();
    Meteor.call('acceptEmailInvite', dataContext.data.teamInviteId, dataContext.data.teamInviteFromUserId, function(error, teamCode) {

      if (error) {
        console.log(error.reason);
        Meteor.userFunctions.addError(error.reason);
        return;
      }
      console.log('!');
      Router.go('team', {teamCode: teamCode});
    });
  },
 'click #decline': function(event) {
    event.preventDefault();
    Meteor.call('declineEmailInvite', dataContext.data.teamInviteId, dataContext.data.teamInviteFromUserId, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
      Router.go('home');
    });
  },
  'click #sign-in': function(event) {
    event.preventDefault();
    Session.set('redir',Router.current().path);
    Router.go('signIn');
  },
  'click #sign-up': function(event) {
    event.preventDefault();
    Session.set('redir',Router.current().path);
    Router.go('signUp');
  }
});