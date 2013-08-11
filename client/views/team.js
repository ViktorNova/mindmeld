Template.team.helpers(Meteor.userFunctions);
Template.teamBody.helpers(Meteor.userFunctions);
Template.teamButtons.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));
Template.projectLinks.helpers(_.extend({
  allProjects: function() {
    return Projects.find({teamId: Session.get('currentTeamId')},{sort: {statusChanged: -1}});
  }
},Meteor.userFunctions));


Template.teamBody.events({
  'click #editTeam': function(event) {
    event.preventDefault();
    Meteor.Router.to('editTeam', this.code);
  },
  'click #inviteUsers': function(event) {
    event.preventDefault();
    Meteor.Router.to('inviteUsers', this.code);
  },
  'click #createProject': function(event) {
    event.preventDefault();
    Meteor.Router.to('createProject', this.code);
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