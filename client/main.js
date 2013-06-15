Deps.autorun(function() {
  Meteor.subscribe('teams', Meteor.userId());
  Meteor.subscribe('teamProjects', Meteor.userId());
  Meteor.subscribe('teamMilestones', Meteor.userId());
  Meteor.subscribe('teamIssues', Meteor.userId());
  Meteor.subscribe('teamMembers', Meteor.userId());
});
