Template.projectList.helpers({
  teamCode: function() {
    return Teams.findOne(this.teamId).code;
  }
});

Template.projectListWithTeam.helpers({
  teamCode: function() {
    return Teams.findOne(this.teamId).code;
  },
  teamName: function() {
    return Teams.findOne(this.teamId).name;
  }
});
