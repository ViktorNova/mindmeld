Template.milestoneList.helpers({
  teamCode: function() {
    return Teams.findOne(this.teamId).code;
  },
  projectCode: function() {
    return Projects.findOne(this.projectId).code;
  }
});
