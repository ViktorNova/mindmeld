Teams = new Meteor.Collection('teams');

Meteor.methods({
  getTeamId: function(teamCode) {

    if (!teamCode)
      return null;

    if (! this.isSimulation) {
      var Future = Npm.require('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function() {
        future.ret();
      }, 5 * 100);
      future.wait();
    }

    console.log("looking for Tcode " + teamCode);
    var team = Teams.findOne({code: teamCode});
    if (team) {
      return team._id;
    } else {
      return "NOTFOUND";
    }
  },
  createTeam: function(teamAttributes) {
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a team");
    //todo: validation
    //validate name to max 80 chars

    var team = _.extend(_.pick(teamAttributes, 'name', 'detail'), {
      code: teamAttributes.name.toCode(),
      members: [ Meteor.userId() ],
      createdByUserId: Meteor.userId(),
      updatedAt: new Date()
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
    var oldTeam = Teams.findOne(team._id);    

    Teams.update( { _id: team._id }, { $set: {
      name: team.name,
      detail: team.detail,
      code: team.code,
      updatedAt: new Date()
    }});

    var newTeam = Teams.findOne(team._id);

    var notificationAttributes = {
      entity: 'team', 
      action: 'edit', 
      oldTeam: oldTeam,
      newTeam: newTeam
    };

    Meteor.call('editTeamNotification', notificationAttributes, function(error, notification) {
      if (error) {
        console.log(error);
        //TODO: handle errors in notifications
      }
    });

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
