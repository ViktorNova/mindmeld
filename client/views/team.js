Template.team.helpers(Meteor.userFunctions);
Template.teamBody.helpers(_.extend({
  invitesAndMembersCountInTeamIsThreeOrGreater: function() {
    var memberCount = dataContext.data.currentTeam.members.length;
    var teamInvitesCount = TeamInvites.find({teamId: dataContext.data.currentTeam._id}).fetch().length;

    return (memberCount + teamInvitesCount) >= 7;
  },
  notStartedIssuesWithTagCount: function() { 
    return Issues.find({teamId: this.teamId, status: 0, tags: {$in: [this.tag]}},{sort: {rank: 1}}).count();
  },
  inProgressIssuesWithTagCount: function() {
    return Issues.find({teamId: this.teamId, status: 1, tags: {$in: [this.tag]}},{sort: {statusChanged: -1}}).count();
  },
  completedIssuesWithTagCount: function() {
    return Issues.find({teamId: this.teamId, status: 2, tags: {$in: [this.tag]}},{sort: {statusChanged: -1}}).count();
  },
  cancelledIssuesWithTagCount: function() {
    return Issues.find({teamId: this.teamId, status: 3, tags: {$in: [this.tag]}},{sort: {statusChanged: -1}}).count();
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