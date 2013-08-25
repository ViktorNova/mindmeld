Meteor.publish('userTeams', function(userId) {

    var future = new Future;

    // simulate high latency publish function
    Meteor.setTimeout(function () {
      future.return(Teams.find({members: {$in: [userId]}}));
    }, 10);

    return future.wait();
});

Meteor.publish('userProjects', function(userId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return Projects.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});
});

Meteor.publish('teamMembers', function(userId) {

  var future = new Future;

  var allTeamMembers = _.flatten(_.pluck(Teams.find({members: {$in: [userId]}}).fetch(),'members'));

    Meteor.setTimeout(function () {
      future.return(Meteor.users.find({_id: {$in: allTeamMembers}},
        {fields: { username: 1, showPublic: 1, firstName: 1, lastName: 1}}));
    }, 10);

    return future.wait();
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

    var future = new Future;

    // simulate high latency publish function
    Meteor.setTimeout(function () {
      future.return(Meteor.users.find({}, {fields: { username: 1}}));
    }, 10);

    return future.wait();
});

Meteor.publish('teamInvites', function(userId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return TeamInvites.find({teamId: {$in: _.pluck(teams, '_id')}});
});

Meteor.publish('userTags', function(userId) {
  var teams = Teams.find({members: {$in: [userId]}}).fetch();
  return Tags.find({teamId: {$in: _.pluck(teams, '_id')}});
});

//LEGACY

// Meteor.publish('usernames', function() {
//   return Meteor.users.find({}, {fields: { username: 1}});
// });
// Meteor.publish('teams', function(userId) {
//   return Teams.find({members: {$in:[userId]}},{sort: {updatedAt: -1}});
// });
// Meteor.publish('allTeams', function() {
//   return Teams.find({},{fields: { name: 1, code: 1}});
// });
// Meteor.publish('teamProjects', function(userId, teamId) {
//   var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
//   if (team)
//     return Projects.find({teamId: teamId}, {sort: {updatedAt: -1}});
// });
// Meteor.publish('teamFeatures', function(userId, teamId) {
//   var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
//   if (team)
//     return Features.find({teamId: teamId}, {sort: {updatedAt: -1}});
// });
// Meteor.publish('teamIssues', function(userId, teamId) {
//   var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
//   if (team)
//     return Issues.find({teamId: teamId},{sort: {statusChanged: -1}});
// });
// Meteor.publish('teamMembers', function(userId, teamId) {
//   var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
//   if (team) {
//     return teamMembers = Meteor.users.find({_id: {$in: team.members}},
//       {fields: {
//         username: 1, 
//         showPublic: 1, 
//         firstName: 1,
//         lastName: 1
//       }
//     });
//   }
// });
// Meteor.publish('userProjects', function(userId, teamId) {
//   var teams = Teams.find({members: {$in: [userId]}}).fetch();
//   return Projects.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});
// });
// Meteor.publish('userFeatures', function(userId, teamId) {
//   var teams = Teams.find({members: {$in: [userId]}}).fetch();
//   return Features.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});
// });
// Meteor.publish('userIssues', function(userId, teamId) {
//   var teams = Teams.find({members: {$in: [userId]}}).fetch();
//   return Issues.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});
// });
// Meteor.publish('userNotifications', function(userId, teamId) {
//   var teams = Teams.find({members: {$in: [userId]}}).fetch();
//     return Notifications.find({teamId: {$in: _.pluck(teams, '_id')}},{sort: {updatedAt: -1}});  
// });
// Meteor.publish('teamMovements', function(userId, teamId) {
//   var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
//   if (team)
//     return Movements.find({teamId: teamId});
// });
// Meteor.publish('teamTags', function(userId, teamId) {
//   var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
//   if (team)
//     return Tags.find({teamId: teamId},{sort: {count: -1 }});
// });
// Meteor.publish('issueComments', function(userId, teamId, issueId) {  
//   var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
//   if (team)
//     return Comments.find({teamId: teamId, issueId: issueId},{sort: {createdAt: -1}});
// });
// Meteor.publish('teamInvites', function(userId, teamId) {
//   var team = Teams.findOne({_id: teamId, members: {$in: [userId]}});
//   if (team)
//     return TeamInvites.find({teamId: teamId});
// });
// Meteor.publish('teamInviteForInvitee', function(id, receivedFrom) {
//   return TeamInvites.find({_id: id, receivedFrom: receivedFrom},{fields: {receivedFrom: 1, teamId: 1}});
// });
// Meteor.publish('teamInviteForUsernameInvitee', function(username) {  
//   return TeamInvites.find({username: username});
// });