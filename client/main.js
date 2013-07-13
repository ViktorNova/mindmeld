Deps.autorun(function() {
  Meteor.subscribe('teamMembers', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamNotifications', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamMovements', Meteor.userId(), Session.get('currentTeamId'));
  // Meteor.subscribe('teamRankedIssues', Meteor.userId(), Session.get('currentTeamId'));
  Meteor.subscribe('teamTags', Meteor.userId(), Session.get('currentTeamId'));

  var movement = Movements.findOne({userId: Session.get('following')});
  if (movement) {
    Meteor.Router.to(Meteor.Router[movement.template + "Path"](movement.templatePathAttributes));
  }

});