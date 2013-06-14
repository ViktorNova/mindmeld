Meteor.publish('teams', function(userId) {
  return Teams.find({members: {$in:[userId]}});
});

Meteor.publish('teamProjects', function(userId) {
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Projects.find({teamId: {$in:_.pluck(teams, '_id')}});
});

Meteor.publish('teamMilestones', function(userId) {
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Milestones.find({teamId: {$in: _.pluck(teams, '_id')}});
});

Meteor.publish('teamIssues', function(userId) {
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Issues.find({teamId: {$in: _.pluck(teams, '_id')}});
});