Deps.autorun(function() {
  Meteor.subscribe('teams', Meteor.userId());
  Meteor.subscribe('teamProjects', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamMilestones', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamIssues', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamMembers', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamNotifications', Meteor.userId(), Session.get('currentTeamId'));
});