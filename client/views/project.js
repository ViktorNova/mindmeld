Template.project.helpers({
  teamCode: function() {
    return Teams.findOne(this.teamId).code;
  },
  teamName: function() {
    return Teams.findOne(this.teamId).name;
  },
  currentProject: function() {
    return Projects.findOne(Session.get('currentProjectId'));
  },
  allMilestones: function() {
    return Milestones.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId')
    });
  }
});
