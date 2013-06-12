Deps.autorun(function() {
  Meteor.subscribe('teams', Meteor.userId());
  Meteor.subscribe('teamProjects', Session.get('currentTeamId'));
  Meteor.subscribe('teamMilestones', Session.get('currentTeamId'));
  Meteor.subscribe('teamIssues', Session.get('currentTeamId'));
});
