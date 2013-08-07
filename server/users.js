Meteor.methods({
  getPublicUsernames: function(usernameFragment, teamId) {
    var usernames = Meteor.users.find({username: new RegExp(usernameFragment), showPublic: true},{username: 1}).fetch();
    var ret = _.map(usernames, function(item) { return {id: item.username, text: item.username}});
    var excludedUsernames = _.pluck(TeamInvites.find({teamId: teamId, username: {$exists: true}}).fetch(),'username');
    excludedUsernames.push(Meteor.user().username);

    var filter = _.filter(ret, function(user) { return !(_.contains(excludedUsernames, user.id)) });
    console.log(filter);
    return filter;
  },
  validateEmailForSelect2: function(email) {
    if (email.match(/\S+@\S+\.\S+/))
      return [{id: email, text: email}];
    else
      return [];
  }
})