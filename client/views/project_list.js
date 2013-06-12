Template.projectList.helpers({
  teamCode: function() {
    return Teams.findOne(this.teamId).code;
  }
});
