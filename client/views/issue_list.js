Template.issueList.helpers({
  teamCode: function() {
    return Teams.findOne(this.teamId).code;
  },
  projectCode: function() {
    return Projects.findOne(this.projectId).code;
  },
  milestoneIndex: function() {
    return Milestones.findOne(this.milestoneId).index;
  }
});

Template.issueListWithTeamAndProjectAndMilestone.helpers({
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
    return Projects.findOne(this.projectId).code;
  },
  milestoneIndex: function() {
    return Milestones.findOne(this.milestoneId).index;
  }
});
