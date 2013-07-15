Meteor.publish('userTeams', function(userId, limit) {
  return Teams.find({members: {$in:[userId]}},{sort: {statusChanged: -1}, limit: limit});
});
Meteor.publish('userProjects', function(userId, limit) {
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Projects.find({teamId: {$in: _.pluck(teams, '_id')}}, {sort: {statusChanged: -1}, limit: limit});
});
Meteor.publish('userFeatures', function(userId, limit) {
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Features.find({teamId: {$in: _.pluck(teams, '_id')}}, {sort: {statusChanged: -1}, limit: limit});
});
// Meteor.publish('userIssues', function(userId, limit) {
//   var teams = Teams.find({members: {$in:[userId]}}).fetch();
//   return Issues.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {statusChanged: -1}, limit: limit});
// });
Meteor.publish('teamProjects', function(teamId, limit) {
  return Projects.find({teamId: teamId}, {sort: {statusChanged: -1}, limit: limit});
});
Meteor.publish('teamFeatures', function(teamId, limit) {
  return Features.find({teamId: teamId}, {sort: {statusChanged: -1}, limit: limit});
});
Meteor.publish('teamIssues', function(teamId, limit) {
  return Issues.find({teamId: teamId},{sort: {statusChanged: -1}, limit: limit});
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
});
// Meteor.publish('teamRankedIssues', function(userId, teamId) {
//   var teams = Teams.find({members: {$in:[userId]}}).fetch();
//   return Issues.find({teamId: {$in: _.pluck(teams, '_id')},rank: {$exists: true}},{sort: {rank: 1}});
// });
Meteor.publish('teamTags', function(userId, teamId) {
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Tags.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {count: -1 }});
});

Meteor.publish('allIssuesNotStarted', function(userId, limit) {
 var featuresOwnedByUser = Features.find({ownedByUserId: userId}).fetch();
  if (featuresOwnedByUser) 
    return Issues.find({ status: 0, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}},{sort: {statusChanged: -1 },limit: 5});
});

// Meteor.publish('allIssuesByStatus', function(userId, status, limit) {
//  var featuresOwnedByUser = Features.find({ownedByUserId: userId}).fetch();
//   if (featuresOwnedByUser) 
//     return Issues.find({ status: status, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}},{sort: {statusChanged: -1 },limit: 5});
// });