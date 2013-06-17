Teams = new Meteor.Collection('teams');

Meteor.methods({
  insertTeam: function(teamAttributes) {
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
  }
});
