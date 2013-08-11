function inviteByEmail(teamInviteId, teamName, receivedFrom, receivedFromUserId, email) {

  Email.send({
    to: email,
    from: 'info@mindmeld.io',
    subject: 'Invitation to join team ' + teamName + " on mindmeld.io",
    text: generateInviteText(teamInviteId, teamName, receivedFrom, receivedFromUserId, email)
  });
}

function generateInviteText(teamInviteId, teamName, receivedFrom, receivedFromUserId, email) {
  return "\
Hi,\n\
You've received a team invitation from mindmeld.io, the realtime collaborative issue tracker:\n\n\
Received from user: " + receivedFrom + "\n\
Team name: " + teamName + "\n\n\
Accepting means that you will become a member of the team, and you can participate in issue tracking.\n\
To accept, please follow the link below. If you already have a Mindmeld account, you'll be prompted to sign in first.\n\
If you don't, you can create a free account before accepting the invitation.\n\n\
http://mindmeld.io/acceptEmailInvite?teamInviteId=" + teamInviteId + "&teamInviteFromUserId=" + receivedFromUserId + "\n\n\
Happy Issue Tracking!\n";
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
        receivedFrom: Meteor.userId(), 
        username: username, 
        createdAt: new Date()
      });
    });

    _.each(invitesByEmail, function(email) {
      var teamInviteId = TeamInvites.insert({
        teamId: teamId,
        receivedFrom: Meteor.userId(),
        email: email,
        createdAt: new Date()
      });
      inviteByEmail(teamInviteId, team.name, Meteor.user().username, Meteor.userId(), email);
    });
  },
  revokeByEmail: function(teamId, email) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to revoke by email");

    var team = Teams.findOne({_id: teamId, members: {$in: [Meteor.userId()]}});
    if (!team)
      throw new Meteor.Error(403, "You are not authorized to add invites to this team");

    TeamInvites.remove({teamId: teamId, email: email});
  },
  revokeByUsername: function(teamId, username) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to revoke by username");

    var team = Teams.findOne({_id: teamId, members: {$in: [Meteor.userId()]}});
    if (!team)
      throw new Meteor.Error(403, "You are not authorized to add invites to this team");

    TeamInvites.remove({teamId: teamId, username: username});
  },
  acceptInvite: function(teamInviteId, teamInviteFromUserId) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a feature");

    var teamInvite = TeamInvites.findOne({_id: teamInviteId, receivedFrom: teamInviteFromUserId});

    if (!teamInvite)
      throw new Meteor.Error(403, "No team invite found matching those parameters");

    Teams.update({_id: teamInvite.teamId},{$push: {members: Meteor.userId()}});
    TeamInvites.remove({_id: teamInviteId, receivedFrom: teamInviteFromUserId});


    var joinedTeam = Teams.findOne(teamInvite.teamId);

    var notificationAttributes = {
      entity: 'team',
      action: 'join',
      username: user.username,
      teamId: joinedTeam._id,
      teamCode: joinedTeam.code
    };
    Meteor.call('createJoinTeamNotification', notificationAttributes);

    return joinedTeam.code;
  }
});