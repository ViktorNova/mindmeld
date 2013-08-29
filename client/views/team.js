Template.team.helpers(Meteor.userFunctions);
Template.teamBody.helpers(_.extend({
    invitesAndMembersCountInTeamIsThreeOrGreater: function() {
    console.log(Router);
    var memberCount = dataContext.data.currentTeam.members.length;
    var teamInvitesCount = TeamInvites.find({teamId: dataContext.data.currentTeam._id}).fetch().length;

    return (memberCount + teamInvitesCount) >= 7;
  }
},Meteor.userFunctions));

Template.teamButtons.helpers(Meteor.userFunctions);
Template.projectLinks.helpers(Meteor.userFunctions);

var dataContext;

Template.teamBody.rendered = function() {
  dataContext = this;
};

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
    Meteor.call('removeUserFromTeam',userId, dataContext.data.currentTeam._id, function(error) {
      if (error) {
        Meteor.userFunctions.addError(error.reason);
        return;
      }
    });
  }
}); 