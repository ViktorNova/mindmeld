Meteor.publish('userTeams', function(userId) {
  if (userId)
    return Teams.find({members: {$in: [userId]}});
  else
    return Teams.find({code: ''});
});

Meteor.publish('publicTeams', function() {
  return Teams.find({},{fields: {code: 1, name: 1}});
});

Meteor.publish('userProjects', function(userId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return Projects.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});
});

Meteor.publish('teamMembers', function(userId) {
  var allTeamMembers = _.flatten(_.pluck(Teams.find({members: {$in: [userId]}}).fetch(),'members'));
  return Meteor.users.find({_id: {$in: allTeamMembers}}, 
    {fields: { username: 1, firstName: 1, lastName: 1}});
});

Meteor.publish('publicMembers', function() {
  return Meteor.users.find({},
    {fields: { username: 1, firstName: 1, lastName: 1}});
});

Meteor.publish('userFeatures', function(userId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return Features.find({teamId: {$in: _.pluck(teams, '_id')}}, {sort: {updatedAt: -1}});
});

Meteor.publish('userIssues', function(userId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return Issues.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});
});

Meteor.publish('usernames', function() {
  return Meteor.users.find({}, {fields: { username: 1}});
});

Meteor.publish('teamInvites', function(userId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return TeamInvites.find({teamId: {$in: _.pluck(teams, '_id')}});
});

Meteor.publish('ownTeamInvites', function(username) {
  return TeamInvites.find({username: username});
})

Meteor.publish('userTags', function(userId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return Tags.find({teamId: {$in: _.pluck(teams, '_id')}});
});

Meteor.publish('userNotifications', function(userId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return Notifications.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});  
});

Meteor.publish('teamMovements', function(userId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return Movements.find({teamId: {$in: _.pluck(teams, '_id')}});
});