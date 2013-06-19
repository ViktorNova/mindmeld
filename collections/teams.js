Teams = new Meteor.Collection('teams');

Meteor.methods({
  createTeam: function(teamAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a team");
    //todo: validation
    //validate name to max 80 chars

    var team = _.extend(_.pick(teamAttributes, 'name', 'detail'), {
      code: teamAttributes.name.toCode(),
      members: [ Meteor.userId() ],
      createdByUserId: Meteor.userId()
    });

    var teamId = Teams.insert(team);
    return Teams.findOne(teamId);
  },
  editTeam: function(teamAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit a team");
    //todo: validation
    //validate name to max 80 chars

    var team = _.extend(_.pick(teamAttributes, '_id', 'name', 'detail'), {
      code: teamAttributes.name.toCode(),
    });

    Teams.update( { _id: team._id }, { $set: {
      name: team.name,
      detail: team.detail,
      code: team.code
    }});
    return Teams.findOne(team._id);
  },
  deleteTeam: function(teamId) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete a team");

    Teams.remove( { _id: teamId });
    Projects.remove( { teamId: teamId });
    Milestones.remove( { teamId: teamId });
    Issues.remove( { teamId: teamId });
  }
});
