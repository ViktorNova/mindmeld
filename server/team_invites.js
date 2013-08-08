function inviteByEmail(teamName, email) {
  Email.send({
    to: email,
    from: 'robot@mindmeld.io',
    subject: 'Invite to join ' + teamName,
    text: 'you should join',
    html: '<h1>You Should Join</h1><p>really</p>'
  });
}

Meteor.methods({
  addTeamInvites: function(teamId, invitesByUsername, invitesByEmail) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a feature");

    var team = Teams.findOne({_id: teamId, members: {$in: [Meteor.userId()]}});
    if (!team)
      throw new Meteor.Error(403, "You are not authorized to add invites to this team");

    var maxInvites = 7;
    var currentInvites = TeamInvites.find({teamId: teamId}).count();
    var newInvites = invitesByUsername.length + invitesByEmail.length;

    if (maxInvites - currentInvites - newInvites <= 0)
      throw new Meteor.Error(401, "You have exceeded the number of available invites for this team");

    _.each(invitesByUsername, function(username) {
      TeamInvites.insert({
        teamId: teamId, 
        username: username, 
        createdAt: new Date()
      });
    });

    _.each(invitesByEmail, function(email) {
      TeamInvites.insert({
        teamId: teamId,
        email: email,
        createdAt: new Date()
      });
      inviteByEmail(team.name, email);
    });
  },
  revokeByEmail: function(teamId, email) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a feature");

    var team = Teams.findOne({_id: teamId, members: {$in: [Meteor.userId()]}});
    if (!team)
      throw new Meteor.Error(403, "You are not authorized to add invites to this team");

    TeamInvites.remove({teamId: teamId, email: email});
  },
  revokeByUsername: function(teamId, username) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a feature");

    var team = Teams.findOne({_id: teamId, members: {$in: [Meteor.userId()]}});
    if (!team)
      throw new Meteor.Error(403, "You are not authorized to add invites to this team");

    TeamInvites.remove({teamId: teamId, username: username});
  }
});