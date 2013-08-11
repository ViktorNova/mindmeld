Template.acceptEmailInvite.helpers(Meteor.userFunctions);

Template.acceptEmailInvite.events({
  'click #accept': function(event) {
    event.preventDefault();
    Meteor.call('acceptInvite', Session.get('teamInviteId'), Session.get('teamInviteFromUserId'), function(error, teamCode) {
      console.log("!");
      if (error) {
        console.log(error);
        Meteor.userFunctions.addError(error.reason);
        return;
      }
      console.log("tc"+ teamCode);
      Session.set('teamInviteId', null);
      Session.set('teamInviteFromUserId', null);
      Meteor.Router.to(Meteor.Router.teamPath(teamCode));
    });
  },
 'click #decline': function(event) {
    event.preventDefault();
    console.log('decline');
 }
});