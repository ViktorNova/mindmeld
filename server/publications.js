Meteor.publish('teams', function(userId) {
  return Teams.find({members: {$in:[userId]}});
});

Meteor.publish('teamProjects', function(teamId) {
  return Projects.find({teamId: teamId});
});

Meteor.publish('teamMilestones', function(teamId) {
  return Milestones.find({teamId: teamId});
});

Meteor.publish('teamIssues', function(teamId) {
  return Issues.find({teamId: teamId});
});
