Template.milestone.helpers({
  teamCode: function() {
    return Teams.findOne(this.teamId).code;
  },
  teamName: function() {
    return Teams.findOne(this.teamId).name;
  },
  projectCode: function() {
    return Projects.findOne(this.projectId).code;
  },
  projectName: function() {
    return Projects.findOne(this.projectId).name;
  },
  currentMilestone: function() {
    return Milestones.findOne(Session.get('currentMilestoneId'));
  },
  allIssues: function() {
    return Issues.find({
      teamId: Session.get('currentTeamId'),
      projectId: Session.get('currentProjectId'),
      milestoneId: Session.get('currentMilestoneId')
    });
  }
});
