Meteor.publish('teams', function(userId) {
  return Teams.find({members: {$in:[userId]}},{sort: {updatedAt: -1}});
});
Meteor.publish('teamProjects', function(userId, teamId) {
  var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
  if (team)
    return Projects.find({teamId: teamId}, {sort: {updatedAt: -1}});
});
Meteor.publish('teamFeatures', function(userId, teamId) {
  var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
  if (team)
    return Features.find({teamId: teamId}, {sort: {updatedAt: -1}});
});
Meteor.publish('teamIssues', function(userId, teamId) {
  var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
  if (team)
    return Issues.find({teamId: teamId},{sort: {statusChanged: -1}});
});
Meteor.publish('teamMembers', function(userId, teamId) {
  var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
  if (team) {
    var teamMembers = Meteor.users.find({_id: {$in: team.members}});
    return teamMembers;
  }
});
Meteor.publish('userProjects', function(userId, teamId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return Projects.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});
});
Meteor.publish('userFeatures', function(userId, teamId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return Features.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});
});
Meteor.publish('userIssues', function(userId, teamId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return Issues.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});
});
Meteor.publish('userNotifications', function(userId, teamId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
    return Notifications.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});  
});
Meteor.publish('teamMovements', function(userId, teamId) {
  var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
  if (team)
    return Movements.find({teamId: teamId});
});
Meteor.publish('teamTags', function(userId, teamId) {
  var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
  if (team)
    return Tags.find({teamId: teamId},{sort: {count: -1 }});
});
Meteor.publish('issueComments', function(userId, teamId, issueId) {  
  var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
  if (team)
    return Comments.find({teamId: teamId, issueId: issueId},{sort: {createdAt: -1}});
});
Meteor.publish('teamInvites', function(userId, teamId) {
  var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
  if (team)
    return TeamInvites.find({teamId: teamId});
});

