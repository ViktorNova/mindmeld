Meteor.publish('teams', function(userId) {
  return Teams.find({members: {$in:[userId]}});
});

Meteor.publish('teamProjects', function(userId, teamId) {
  //teamId is ignored, is that ok?
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Projects.find({teamId: {$in:_.pluck(teams, '_id')}});
});

Meteor.publish('teamMilestones', function(userId, teamId) {
  //teamId is ignored, is that ok?
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Milestones.find({teamId: {$in: _.pluck(teams, '_id')}});
});

Meteor.publish('teamIssues', function(userId, teamId) {
  //teamId is ignored, is that ok?
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Issues.find({teamId: {$in: _.pluck(teams, '_id')}});
});
Meteor.publish('teamMembers', function(userId, teamId) {
  //teamId is ignored, is that ok?
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  var allMembers = _.flatten(_.pluck(teams, 'members'));
  var teamMembers = Meteor.users.find({_id: {$in: allMembers}});
  return teamMembers;
});
Meteor.publish('teamNotifications', function(userId, teamId) {
  //teamId is ignored, is that ok?
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Notifications.find({teamId: {$in: _.pluck(teams, '_id')}});  
});
Meteor.publish('teamMovements', function(userId, teamId) {
  //teamId is ignored, is that ok?
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Movements.find({teamId: {$in: _.pluck(teams, '_id')}});
})