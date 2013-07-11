
allIssuesNotStartedHandle = Meteor.subscribeWithPagination('allIssuesNotStarted', Meteor.userId() ,5);
allIssuesInProgressHandle = Meteor.subscribeWithPagination('allIssuesInProgress', Meteor.userId() ,5);
allIssuesCompletedHandle = Meteor.subscribeWithPagination('allIssuesCompleted', Meteor.userId() ,5);
allIssuesCancelledHandle = Meteor.subscribeWithPagination('allIssuesCancelled', Meteor.userId() ,5);

Deps.autorun(function() {
  Meteor.subscribe('teams', Meteor.userId());
  Meteor.subscribe('teamProjects', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamFeatures', Meteor.userId(), Session.get('currentTeamId'));
  teamIssuesHandle = Meteor.subscribeWithPagination('teamIssues', Meteor.userId(), Session.get('currentTeamId'),5);
  Meteor.subscribe('teamMembers', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamNotifications', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamMovements', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamRankedIssues', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamTags', Meteor.userId(), Session.get('currentTeamId'));

  var movement = Movements.findOne({userId: Session.get('following')});
  if (movement) {
    Meteor.Router.to(Meteor.Router[movement.template + "Path"](movement.templatePathAttributes));
  }

});