Template.team.helpers(Meteor.userFunctions);
Template.teamBody.helpers(Meteor.userFunctions);
Template.teamButtons.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));
Template.projectLinks.helpers(Meteor.userFunctions);

Template.teamBody.events({
  'click #editTeam': function(event) {
    event.preventDefault();
    Router.go('editTeam', {teamCode: this.code});
  },
  'click #inviteUsers': function(event) {
    event.preventDefault();
    Router.go('inviteUsers', {teamCode: this.code});
  },
  'click #createProject': function(event) {
    event.preventDefault();
    Router.go('createProject', {teamCode: this.code});
  },
  'click .remove-user': function(event) {
    event.preventDefault();
    var userId = event.target.dataset.userid;
    //todo: some method calls pass in a teamid from a DOM element, some lookup the session currentTeamId.
    //standardise on one method.
    Meteor.call('removeUserFromTeam',userId, Session.get('currentTeamId'), function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
    });
  }
}); 