Template.team.helpers({
  currentTeam: function() {
    return Teams.findOne(Session.get('currentTeamId'));
  },
  allProjects: function() {
    return Projects.find();
  }
});
