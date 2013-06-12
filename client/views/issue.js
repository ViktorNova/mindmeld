Template.issue.helpers({
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
  milestoneIndex: function() {
    return Milestones.findOne(this.milestoneId).index;
  },
  currentIssue: function() {
    return Issues.findOne(Session.get('currentIssueId'));
  }
});
