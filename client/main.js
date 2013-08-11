Deps.autorun(function() {
  Meteor.subscribe('teams', Meteor.userId());
  Meteor.subscribe('allTeams');
  Meteor.subscribe('teamProjects', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamFeatures', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamIssues', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamMembers', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamMovements', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamTags', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamInvites', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamInviteForInvitee', Session.get('teamInviteId'), Session.get('teamInviteFromUserId'));
  Meteor.subscribe('userProjects', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('userFeatures', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('userIssues', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('userNotifications', Meteor.userId(), Session.get('currentTeamId'));

  Meteor.subscribe('issueComments', Meteor.userId(), Session.get('currentTeamId'), Session.get('currentIssueId'));


  var movement = Movements.findOne({userId: Session.get('following')});
  if (movement) {
    Meteor.Router.to(Meteor.Router[movement.template + "Path"](movement.templatePathAttributes));
  }
});