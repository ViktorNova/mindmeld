Deps.autorun(function() {
  Meteor.subscribe('teams', Meteor.userId());
  Meteor.subscribe('teamProjects', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamFeatures', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamIssues', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamMembers', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamNotifications', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamMovements', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamIssueRankings', Meteor.userId(), Session.get('currentTeamId'));

  var movement = Movements.findOne({userId: Session.get('following')});
  if (movement) {
    Meteor.Router.to(Meteor.Router[movement.template + "Path"](movement.templatePathAttributes));
  }

});