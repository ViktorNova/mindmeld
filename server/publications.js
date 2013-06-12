Meteor.publish('teams', function(userId) {
  return Teams.find({members: {$in:[userId]}});
});

Meteor.publish('teamProjects', function(teamId) {
  return Projects.find({teamId: teamId});
});

Meteor.publish('projectMilestones', function(projectId) {
  return Milestones.find({projectId: projectId});
});

Meteor.publish('milestoneIssues', function(milestoneId) {
  return Issues.find({milestoneId: milestoneId});
});
