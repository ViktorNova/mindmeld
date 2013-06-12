Deps.autorun(function() {
  Meteor.subscribe('teams', Meteor.userId());
  Meteor.subscribe('teamProjects', Session.get('currentTeamId'));
  Meteor.subscribe('projectMilestones', Session.get('currentProjectId'));
  Meteor.subscribe('milestoneIssues', Session.get('currentMilestoneId'));
});
