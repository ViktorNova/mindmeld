Meteor.methods({
  getPublicUsernames: function(usernameFragment, teamId) {

    var team = Teams.findOne({_id: teamId, members: {$in: [Meteor.userId()]}});
    if (!team)
      throw new Meteor.Error(403, "You are not authorized to get public usernames for this team");


    var usernames = Meteor.users.find({username: new RegExp(usernameFragment), showPublic: true},{username: 1}).fetch();
    var ret = _.map(usernames, function(item) { return {id: item.username, text: item.username}});
    var excludedUsernames = _.pluck(TeamInvites.find({teamId: teamId, username: {$exists: true}}).fetch(),'username');
    var teamUsernames = _.map(team.members, function(member) { return Meteor.users.findOne(member).username; });
    excludedUsernames = _.union(excludedUsernames, teamUsernames);

    var filter = _.filter(ret, function(user) { return !(_.contains(excludedUsernames, user.id)) });
    return filter;
  },
  validateEmailForSelect2: function(email, teamId) {

    var team = Teams.findOne({_id: teamId, members: {$in: [Meteor.userId()]}});
    if (!team)
      throw new Meteor.Error(403, "You are not authorized to get emails for this team");

    var existingEmail = TeamInvites.findOne({teamId: teamId, email: email});
    if (existingEmail)
      return [];

    if (email.match(/\S+@\S+\.\S+/))
      return [{id: email, text: email}];
    else
      return [];
  }
})