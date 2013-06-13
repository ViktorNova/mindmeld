Template.milestoneList.helpers({
  teamCode: function() {
    return Teams.findOne(this.teamId).code;
  },
  projectCode: function() {
    return Projects.findOne(this.projectId).code;
  }
});

Template.milestoneListWithTeamAndProject.helpers({
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
  }
});
