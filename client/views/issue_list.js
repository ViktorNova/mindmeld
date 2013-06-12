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
