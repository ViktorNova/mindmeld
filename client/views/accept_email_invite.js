Template.acceptEmailInvite.helpers(Meteor.userFunctions);

Template.acceptEmailInvite.events({
  'click #accept': function(event) {
    event.preventDefault();
    Meteor.call('acceptEmailInvite', Session.get('teamInviteId'), Session.get('teamInviteFromUserId'), function(error, teamCode) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
      Session.set('teamInviteId', null);
      Session.set('teamInviteFromUserId', null);
      Meteor.Router.to(Meteor.Router.teamPath(teamCode));
    });
  },
 'click #decline': function(event) {
    event.preventDefault();
    Meteor.call('declineEmailInvite', Session.get('teamInviteId'), Session.get('teamInviteFromUserId'), function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
      Session.set('teamInviteId', null);
      Session.set('teamInviteFromUserId', null);
      Meteor.Router.to(Meteor.Router.homePath());
    });
  },
  'click #sign-in': function(event) {
    event.preventDefault();
    Session.set('redir','acceptEmailInvite');
    Meteor.Router.to(Meteor.Router.signInPath());
  },
  'click #sign-up': function(event) {
    event.preventDefault();
    Session.set('redir','acceptEmailInvite');
    Meteor.Router.to(Meteor.Router.signUpPath());
  }
});