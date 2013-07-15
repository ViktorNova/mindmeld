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
Meteor.publish('userIssues', function(userId, limit) {
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Issues.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {statusChanged: -1}, limit: limit});
});
Meteor.publish('teamProjects', function(teamId, limit) {
  return Projects.find({teamId: teamId}, {sort: {statusChanged: -1}, limit: limit});
});
Meteor.publish('teamFeatures', function(teamId, limit) {
  return Features.find({teamId: teamId}, {sort: {statusChanged: -1}, limit: limit});
});
Meteor.publish('teamIssues', function(teamId, limit) {
  console.log('finding issues for team ' + teamId);
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
Meteor.publish('teamRankedIssues', function(userId, teamId) {
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Issues.find({teamId: {$in: _.pluck(teams, '_id')},rank: {$exists: true}},{sort: {rank: 1}});
});
Meteor.publish('teamTags', function(userId, teamId) {
  var teams = Teams.find({members: {$in:[userId]}}).fetch();
  return Tags.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {count: -1 }});
});
Meteor.publish('allIssuesNotStarted', function(userId, limit) {

    if (! this.isSimulation) {
      var Future = Npm.require('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function() {
        future.ret();
      }, 5 * 100);
      future.wait();
    }

  var featuresOwnedByUser = Features.find({ownedByUserId: userId}).fetch();
  if (featuresOwnedByUser) 
    return Issues.find({ status: 0, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}},{sort: {statusChanged: -1 },limit: 5});
});
Meteor.publish('allIssuesInProgress', function(userId, limit) {

    if (! this.isSimulation) {
      var Future = Npm.require('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function() {
        future.ret();
      }, 5 * 100);
      future.wait();
    }

  var featuresOwnedByUser = Features.find({ownedByUserId: userId}).fetch();
  if (featuresOwnedByUser) 
    return Issues.find({ status: 1, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}},{sort: {statusChanged: -1 },limit: 5});
});
Meteor.publish('allIssuesCompleted', function(userId, limit) {

    if (! this.isSimulation) {
      var Future = Npm.require('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function() {
        future.ret();
      }, 5 * 100);
      future.wait();
    }

  var featuresOwnedByUser = Features.find({ownedByUserId: userId}).fetch();
  if (featuresOwnedByUser) 
    return Issues.find({ status: 2, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}},{sort: {statusChanged: -1 },limit: 5});
});
Meteor.publish('allIssuesCancelled', function(userId, limit) {

    if (! this.isSimulation) {
      var Future = Npm.require('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function() {
        future.ret();
      }, 5 * 100);
      future.wait();
    }

  var featuresOwnedByUser = Features.find({ownedByUserId: userId}).fetch();
  if (featuresOwnedByUser) 
    return Issues.find({ status: 3, featureId: {$in: _.pluck(featuresOwnedByUser, '_id')}},{sort: {statusChanged: -1 },limit: 5});
});
