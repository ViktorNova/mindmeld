Meteor.publish('teams', function(userId) {
  return Teams.find({members: {$in:[userId]}});
});

Meteor.publish('teamProjects', function(userId, teamId) {
  //teamId is ignored, is that ok?
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Projects.find({teamId: {$in:_.pluck(teams, '_id')}});
});

Meteor.publish('teamFeatures', function(userId, teamId) {
  //teamId is ignored, is that ok?
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Features.find({teamId: {$in: _.pluck(teams, '_id')}});
});

Meteor.publish('teamIssues', function(userId, teamId, limit) {
  //teamId is ignored, is that ok?
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Issues.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {statusChanged: -1}, limit: limit});
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
Meteor.publish('teamRankedIssues', function(userId, teamId) {
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Issues.find({teamId: {$in: _.pluck(teams, '_id')},rank: {$exists: true}},{sort: {rank: 1}});
});
Meteor.publish('teamTags', function(userId, teamId) {
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Tags.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {count: -1 }});
});
Meteor.publish('allIssuesNotStarted', function(userId, limit) {
  var featuresOwnedByUser = Features.find({ownedByUserId: userId}).fetch();
  if (featuresOwnedByUser) 
    return Issues.find({ status: 0, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}},{sort: {statusChanged: -1 },limit: limit});
});
Meteor.publish('allIssuesInProgress', function(userId, limit) {
  var featuresOwnedByUser = Features.find({ownedByUserId: userId}).fetch();
  if (featuresOwnedByUser) 
    return Issues.find({ status: 1, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}},{sort: {statusChanged: -1 },limit: limit});
});
Meteor.publish('allIssuesCompleted', function(userId, limit) {
  var featuresOwnedByUser = Features.find({ownedByUserId: userId}).fetch();
  if (featuresOwnedByUser) 
    return Issues.find({ status: 2, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}},{sort: {statusChanged: -1 },limit: limit});
});
Meteor.publish('allIssuesCancelled', function(userId, limit) {
  var featuresOwnedByUser = Features.find({ownedByUserId: userId}).fetch();
  if (featuresOwnedByUser) 
    return Issues.find({ status: 3, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}},{sort: {statusChanged: -1 },limit: limit});
});
