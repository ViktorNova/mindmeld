Meteor.methods({
  createTeam: function(teamAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a team");
    //todo: validation
    //validate name to max 80 chars

    var existingTeamCountForUser = Teams.find({createdByUserId: Meteor.userId()}).count();
    if (existingTeamCountForUser > 0) {
      throw new Meteor.Error(403, "You have already created a team. The beta period limits each user to one team only.");
    }

    var team = _.extend(_.pick(teamAttributes, 'name', 'detail'), {
      code: teamAttributes.name.toCode(),
      upperCaseCode: teamAttributes.name.toCode().toUpperCase(),
      members: [ Meteor.userId() ],
      createdByUserId: Meteor.userId(),
      updatedAt: new Date()
    });

    if (team.name.length < 3 || team.name.length > 30)
      throw new Meteor.Error(403, "Team name must be between 3 and 30 characters");

    if (team.detail.length < 3 || team.detail.length > 1000)
      throw new Meteor.Error(403, "Team description must be between 3 and 1000 characters");

    if (Teams.findOne({upperCaseCode: team.upperCaseCode}))
      throw new Meteor.Error(403, "Team name already exists");

    var teamId = Teams.insert(team);
    return Teams.findOne(teamId);
  },
  editTeam: function(teamAttributes) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a team");

    var team = _.extend(_.pick(teamAttributes, '_id', 'name', 'detail'), {
      code: teamAttributes.name.toCode(),
      upperCaseCode: teamAttributes.name.toCode().toUpperCase()
    });

    if (team.name.length < 3 || team.name.length > 30)
      throw new Meteor.Error(403, "Team name must be between 3 and 30 characters");

    if (team.detail.length < 3 || team.detail.length > 1000)
      throw new Meteor.Error(403, "Team description must be between 3 and 1000 characters");

    var oldTeam = Teams.findOne(team._id);

    if (team.upperCaseCode != oldTeam.upperCaseCode && Teams.findOne({upperCaseCode: team.name.toCode().toUpperCase()})) {
      throw new Meteor.Error(403, "Team name already exists");
    }

    Teams.update( { _id: team._id }, { $set: {
      name: team.name,
      detail: team.detail,
      code: team.code,
      upperCaseCode: team.upperCaseCode,
      updatedAt: new Date()
    }});

    var newTeam = Teams.findOne(team._id);

    var notificationAttributes = {
      entity: 'team', 
      action: 'edit', 
      oldTeam: oldTeam,
      newTeam: newTeam
    };

    Meteor.call('editTeamNotification', notificationAttributes);

    return newTeam;
  },
  deleteTeam: function(teamId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a team");

    Teams.remove( { _id: teamId });
    Projects.remove( { teamId: teamId });
    Features.remove( { teamId: teamId });
    Issues.remove( { teamId: teamId });
    Notifications.remove( { teamId: teamId });
  }
});
