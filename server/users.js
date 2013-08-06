Meteor.methods({
  getPublicUsernames: function(usernameFragment) {
  var usernames = Meteor.users.find({username: new RegExp(usernameFragment), showPublic: true},{username: 1}).fetch();
  console.log('found ' + usernames.length);
  var ret = _.map(usernames, function(item) { return {id: item.username, text: item.username}});
  console.log(ret);
  return ret;
  },
  validateEmailForSelect2: function(email) {
    if (email.match(/\S+@\S+\.\S+/))
      return [{id: email, text: email}];
    else
      return [];
  }
})